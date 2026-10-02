import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223;

async function run() {
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=390,750',
    'http://localhost:5173/'
  ]);

  // wait 2 seconds for chrome to start
  await new Promise(r => setTimeout(r, 2000));

  // get ws url
  const versionData = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}/json/version`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const wsUrl = versionData.webSocketDebuggerUrl;
  console.log('Connected to WS:', wsUrl);

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const currentId = id++;
      callbacks.set(currentId, resolve);
      ws.send(JSON.stringify({ id: currentId, method, params }));
    });
  }

  // Get pages
  const targets = await send('Target.getTargets');
  const pageTarget = targets.result.targetInfos.find(t => t.type === 'page');
  console.log('Target found:', pageTarget.targetId);

  const attach = await send('Target.attachToTarget', { targetId: pageTarget.targetId, flatten: true });
  const sessionId = attach.result.sessionId;

  function sendPage(method, params = {}) {
    return new Promise((resolve) => {
      const currentId = id++;
      callbacks.set(currentId, resolve);
      ws.send(JSON.stringify({ id: currentId, sessionId, method, params }));
    });
  }

  await sendPage('Page.enable');
  await sendPage('DOM.enable');
  await sendPage('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 750,
    deviceScaleFactor: 2,
    mobile: true
  });

  // wait for loader to unveil and page to stabilize
  console.log('Waiting for loader to finish...');
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const isDone = await sendPage('Runtime.evaluate', {
      expression: `!document.querySelector('.loader-portal-root') && !!document.querySelector('.footer-reveal-container')`
    });
    if (isDone.result && isDone.result.result && isDone.result.result.value) {
      console.log('Page loaded and loader finished!');
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1500));

  // Get dimensions of footer
  const info = await sendPage('Runtime.evaluate', {
    expression: `
      (() => {
        const reveal = document.querySelector('.footer-reveal-container');
        const wrap = document.querySelector('.footer-fixed-wrap');
        const inner = document.querySelector('.footer-motion-inner');
        const cta = document.querySelector('.footer-cta');
        const grid = document.querySelector('.footer-grid');
        const bottom = document.querySelector('.footer-bottom');
        return {
          windowHeight: window.innerHeight,
          documentHeight: document.documentElement.scrollHeight,
          revealHeight: reveal ? reveal.offsetHeight : 0,
          wrapHeight: wrap ? wrap.offsetHeight : 0,
          wrapBottom: wrap ? getComputedStyle(wrap).bottom : '',
          wrapPosition: wrap ? getComputedStyle(wrap).position : '',
          innerTransform: inner ? getComputedStyle(inner).transform : '',
          ctaHeight: cta ? cta.offsetHeight : 0,
          gridHeight: grid ? grid.offsetHeight : 0,
          bottomHeight: bottom ? bottom.offsetHeight : 0,
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Footer Info at top of page:', JSON.stringify(info.result?.result?.value, null, 2));

  // Scroll to bottom
  await sendPage('Runtime.evaluate', {
    expression: `window.scrollTo(0, document.documentElement.scrollHeight);`
  });
  await new Promise(r => setTimeout(r, 1500));

  const toRect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, height: r.height, left: r.left, width: r.width };
  };

  const infoBottom = await sendPage('Runtime.evaluate', {
    expression: `
      (() => {
        const toRect = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, height: r.height, left: r.left, width: r.width };
        };
        const reveal = document.querySelector('.footer-reveal-container');
        const wrap = document.querySelector('.footer-fixed-wrap');
        const inner = document.querySelector('.footer-motion-inner');
        const cta = document.querySelector('.footer-cta');
        const main = document.querySelector('main');
        const center = document.elementFromPoint(195, 375);
        return {
          scrollY: window.scrollY,
          maxScroll: document.documentElement.scrollHeight - window.innerHeight,
          centerElement: center ? (center.tagName + '.' + center.className) : null,
          revealRect: toRect(reveal),
          wrapRect: toRect(wrap),
          innerRect: toRect(inner),
          ctaRect: toRect(cta),
          mainRect: toRect(main),
          innerTransform: inner ? getComputedStyle(inner).transform : '',
          wrapOpacity: wrap ? getComputedStyle(wrap).opacity : '',
          wrapVisibility: wrap ? getComputedStyle(wrap).visibility : '',
          wrapDisplay: wrap ? getComputedStyle(wrap).display : '',
          wrapZIndex: wrap ? getComputedStyle(wrap).zIndex : '',
          mainZIndex: main ? getComputedStyle(main).zIndex : '',
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Footer Info at bottom of page:', JSON.stringify(infoBottom.result?.result?.value, null, 2));

  // Take screenshot
  const shot = await sendPage('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/mobile_bottom_shot.png', Buffer.from(shot.result.data, 'base64'));
  console.log('Screenshot saved to scratch/mobile_bottom_shot.png');

  ws.close();
  chrome.kill();
}

run().catch(console.error);
