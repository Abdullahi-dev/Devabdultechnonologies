import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(fetchUrl(res.headers.location));
        return;
      }
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
          resolve(match[1]);
        } else {
          resolve("No og:image found for " + url);
        }
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  const urls = [
    'https://photos.app.goo.gl/SsqPC7rm45ppwz8P8',
    'https://photos.app.goo.gl/bW5XsytZEth4WamS6',
    'https://photos.app.goo.gl/pYBC5yAJcyS573Hk8',
    'https://photos.app.goo.gl/a2UqobzFYf7UvbhbA',
    'https://photos.app.goo.gl/HKRVZMXjkauJTpV69'
  ];
  for (const url of urls) {
    const img = await fetchUrl(url);
    console.log(img);
  }
}
main();
