const https = require('https');
https.get('https://www.olympic.no/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/src="([^"]+\.js[^"]*)"/g) || [];
    console.log('Scripts:', scripts);
  });
});
