import got from 'got';
import { protocol, app } from 'electron';
import { resolve } from 'url';

app.on('ready', () => {
  protocol.registerStreamProtocol('lcu', (req, callback: any) => {
    if (!req.url) return callback(404);

    // const path = url.parse(req.url).pathname!;

    // if (path.startsWith('/lol-game-data')) {
    //   // do some caching bullshit here

    //   return callback(resolve(app.getPath('userData'), path));
    // }

    const { port, password } = global.credentials!;

    const url = resolve(
      `https://riot:${password}@127.0.0.1:${port}`,
      req.url.slice(6)
    );

    callback(got.stream(url));
  });
});

protocol.registerStandardSchemes(['lcu']);
