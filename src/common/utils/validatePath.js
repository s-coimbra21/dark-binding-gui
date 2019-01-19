import { remote } from 'electron';
import path from 'path';
import fs from 'fs-promise';
import isRelative from 'is-relative';
import normalize from 'normalize-path';

function resolvePath(nextPath) {
  try {
    return isRelative(nextPath)
      ? path.resolve(remote.app.getPath('exe'), nextPath)
      : nextPath;
    // Pokemon LUL
  } catch (e) {
    return false;
  }
}

async function exists(pathToCheck) {
  try {
    return fs.exists(pathToCheck);
  } catch (e) {
    return false;
  }
}

async function isDirectory(pathToCheck) {
  try {
    return (await fs.lstat(pathToCheck)).isDirectory();
  } catch (e) {
    return false;
  }
}

async function readdir(dir) {
  try {
    return fs.readdir(dir);
  } catch (e) {
    return [];
  }
}

/* This might not be very performant, consider not validating
 * on every update?
 *
 * isValid: true if it is the League directory
 */
export async function validatePath(nextPath) {
  if (!nextPath) {
    return {
      value: '',
      isValidPath: false,
      isValid: false,
    };
  }

  const absolutePath = resolvePath(nextPath);
  if (!absolutePath || !(await exists(absolutePath))) {
    return {
      value: nextPath,
      isValidPath: false,
      isValid: false,
    };
  }
  const dirIsValid = await isDirectory(absolutePath);
  // TODO: OSX Compatibility
  const files = await readdir(absolutePath);
  const isValid = files.some(
    f => (f && f.toLowerCase()) === 'leagueclient.exe'
  );
  return {
    value: isValid ? normalize(nextPath) : nextPath,
    isValidPath: dirIsValid,
    isValid,
  };
}

export function validatePathSync(nextPath) {
  if (!nextPath) {
    return {
      value: '',
      isValidPath: false,
      isValid: false,
    };
  }

  const absolutePath = resolvePath(nextPath);
  if (!absolutePath || !fs.existsSync(absolutePath)) {
    return {
      value: nextPath,
      isValidPath: false,
      isValid: false,
    };
  }
  const stats = fs.lstatSync(absolutePath);
  const dirIsValid = stats.isDirectory();
  // TODO: OSX Compatibility
  const files = fs.readdirSync(absolutePath);
  const isValid = files.some(
    f => (f && f.toLowerCase()) === 'leagueclient.exe'
  );
  return {
    value: isValid ? normalize(nextPath) : nextPath,
    isValidPath: dirIsValid,
    isValid,
  };
}
