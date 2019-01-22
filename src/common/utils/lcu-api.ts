import { get, patch } from '@utils/lcu-request';

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
  me: get<{ id: string }>('/lol-chat/v1/me'),
};

export const champions = {
  get: (summonerId: number) =>
    get<Champions>(
      `/lol-champions/v1/inventories/${summonerId}/champions-minimal`
    )(),
};
