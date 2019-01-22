import { get, set } from 'lodash';
import logger from 'electron-log';
import {
  fromKeyToSaved,
  fromSavedToArray,
  formatBinding,
  getPrimaryMainKeyDisplay,
  getPrimaryModifierDisplay,
  normalizeKeybindingString,
} from './binding-utils';

export const parseBinding = (str: string = ''): Binding[] => {
  try {
    return fromSavedToArray(str);
  } catch (e) {
    logger.error(e);

    return [];
  }
};

export const keyboardEventToSaved = (event: KeyboardEvent) => {
  return fromKeyToSaved(event);
};

export const formatSaved = (str: string) => formatBinding(str);

export { getPrimaryMainKeyDisplay, getPrimaryModifierDisplay };

export const createReverseMap = (
  settings: object,
  parentKey = '',
  map: Record<string, string> = {}
) => {
  Object.entries(settings).map(([key, value]) => {
    if (typeof value === 'string') {
      const bindings = parseBinding(value)
        .map(normalizeKeybindingString)
        .filter(v => v !== '[<unbound>]' && v);

      bindings.forEach(v => (map[v] = parentKey ? `${parentKey}.${key}` : key));

      return;
    }

    if (typeof value === 'object') {
      createReverseMap(value, parentKey ? `${parentKey}.${key}` : key, map);
    }
  });

  return map;
};

export const updateInputSettings = (
  settings: InputSettings,
  path: string,
  nextValue: string[]
) => {
  const reverseMap = createReverseMap(settings);

  nextValue.map(normalizeKeybindingString).forEach(key => {
    if (reverseMap[key]) {
      const existingBinding = parseBinding(get(settings, reverseMap[key]));

      if (normalizeKeybindingString(existingBinding[0]) === key) {
        existingBinding[0] = '[<Unbound>]';
      }

      if (normalizeKeybindingString(existingBinding[1]) === key) {
        existingBinding[1] = '[<Unbound>]';
      }

      set(settings, reverseMap[key], existingBinding.join(','));
    }

    set(settings, path, nextValue.join(','));
  });
};
