import { get, patch } from '@utils/lcu-request';

import championsJson from '../../../static/champions.json';

export const inputSettings = {
  get: get<InputSettings>('/lol-game-settings/v1/input-settings'),
  patch: patch<InputSettings, InputSettings>(
    '/lol-game-settings/v1/input-settings'
  ),
};

export const inputSettingsSchema = {
  get: get<InputSettings>('/lol-game-settings/v1/input-settings-schema'),
};

export const chat = {
  // Just getting summonerId
  me: get<{ id: string }>('/lol-chat/v1/me'),
};

// export const champions = {
//   get: (summonerId: number) =>
//     get<Champions>(
//       `/lol-champions/v1/inventories/${summonerId}/champions-minimal`
//     )().then(champions => champions.filter(c => c.id >= 0)),
// };

export const champions = {
  get: () => Promise.resolve(championsJson),
};
