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

export const summoner = {
  // Just getting summonerId
  currentSummoner: get<{ summonerId: number }>(
    '/lol-summoner/v1/current-summoner'
  ),
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
