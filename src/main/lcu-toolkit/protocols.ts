import got from 'got';
import { protocol, app } from 'electron';
import { resolve } from 'url';
import { monitor } from './ws';
import { error } from 'electron-log';

app.on('ready', () => {
  protocol.registerStreamProtocol('lcu', (req, callback: any) => {
    if (!req.url) return callback(404);

    // const path = url.parse(req.url).pathname!;

    // if (path.startsWith('/lol-game-data')) {
    //   // do some caching bullshit here

    //   return callback(resolve(app.getPath('userData'), path));
    // }

    const { port, password } = monitor.lockfile!;

    const url = resolve(
      `https://riot:${password}@127.0.0.1:${port}`,
      req.url.slice(6)
    );

    callback(got.stream(url, { rejectUnauthorized: false }).on('error', error));
  });
});

protocol.registerStandardSchemes(['lcu']);
