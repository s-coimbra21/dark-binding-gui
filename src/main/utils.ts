import { webContents } from 'electron';

export const broadcast = (event: string, data?: any) => {
  webContents.getAllWebContents().forEach(win => win.send(event, data));
};
