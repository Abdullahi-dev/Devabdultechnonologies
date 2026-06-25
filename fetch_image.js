import https from 'https';

function fetchUrl(url) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      fetchUrl(res.headers.location);
      return;
    }
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) {
        console.log(match[1]);
      } else {
        console.log("No og:image found");
      }
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

fetchUrl('https://photos.app.goo.gl/ZrSzFxeWxKTtUoED9');
