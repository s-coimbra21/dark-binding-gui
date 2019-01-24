// taken directly and from the league client and slightly adapted, for maximum compatibility with the official format
import * as os from 'os';

import { keys, codes } from './keycode-mapping';

function _isWindows() {
  return os.platform() === 'win32';
}

function _splitSaved(e) {
  for (var t = void 0, n = e.indexOf(','); n !== -1; ) {
    if (0 === n) {
      t = ['', e.slice(1)];
      break;
    }
    if ('[' !== e.charAt(n - 1)) {
      t = [e.slice(0, n), e.slice(n + 1)];
      break;
    }
    n = e.indexOf(',', n + 1);
  }
  return n === -1 && (t = [e]), t;
}

export function fromSavedToArray(e) {
  var t = e.split(',');
  return e.indexOf('[,]') === -1 ? t : _splitSaved(e);
}

export function getModifiers(e) {
  return (
    _resolveMetaKey(e) +
    (e.shiftKey ? '[Shift]' : '') +
    (e.ctrlKey ? '[Ctrl]' : '') +
    (e.altKey ? '[Alt]' : '')
  );
}

function _resolveMetaKey(e) {
  return e.metaKey ? (_isWindows() ? '[Win]' : '[Cmd]') : '';
}

export function fromKeyToSaved(e) {
  var t;
  return (t = codes[e.code]), void 0 !== t ? _getModifiers(e) + t : void 0;
}

export function getPrimaryModifierDisplay(e) {
  if (void 0 === e || void 0 === e[0]) return '';
  var t = e[0];
  return d(t.slice(0, t.lastIndexOf('[', t.length - 3)), ' ');
}

export function getPrimaryMainKeyDisplay(e) {
  if (void 0 === e || void 0 === e[0]) return '';
  var t = e[0],
    n = t.slice(t.lastIndexOf('[', t.length - 3));
  return keys[n];
}

function d(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ' ';
  if (0 === e.length) return '';
  var n = e.replace('[Cmd]', 'Cmd' + t).replace('[Alt]', 'Alt' + t);
  return (
    (n = n.replace('[alt]', 'Alt' + t).replace('[ctrl]', 'Ctrl' + t)),
    (n = n.replace('[Shift]', 'Shift' + t).replace('[Ctrl]', 'Ctrl' + t))
  );
}

export function formatBinding(e) {
  if (void 0 === e) return '';
  var t = e.slice(e.lastIndexOf('[', e.length - 3)),
    n = e.slice(0, e.lastIndexOf('[', e.length - 3)),
    a = keys[t];
  return void 0 === a ? e : d(n, ' + ') + a;
}

function p(e) {
  return void 0 === e || void 0 === e[0]
    ? ''
    : formatBinding(void 0 === e[1] ? e[0] : fromSavedToArray(e[0])[e[1] - 1]);
}

export function normalizeKeybindingString(e) {
  var t = e;
  t = t.toLowerCase();
  var n = g(t);
  n.length > 2 && n.sort(E);
  for (var a = '', o = 0; o < n.length; o++) a += n[o];
  return a;
}

function g(e) {
  for (var t = [], n = e.indexOf('['); n !== -1; ) {
    var a = e.indexOf(']', n + 1);
    if (a === -1) return '';
    a + 1 < e.length && ']' === e.charAt(a + 1) && (a += 1);
    var o = e.substr(n, a - n + 1);
    t.push(o), (n = e.indexOf('[', a + 1));
  }
  return t;
}

function E(e, t) {
  return h(e) - h(t);
}

function h(e) {
  return '[ctrl]' === e
    ? 1
    : '[alt]' === e
    ? 2
    : '[shift]' === e
    ? 3
    : '[cmd]' === e || '[win]' === e
    ? 4
    : 5;
}
