import type { UserData, ResponseData } from './types';

function isValidUser(data: unknown): data is UserData {
  return typeof data === 'object' && data !== null && 'login' in data && 'password' in data;
}

function isValidJSON(json: unknown): json is string {
  return !(typeof json !== 'string' || json === null);
}

function isValidData(data: unknown): data is ResponseData {
  return !(typeof data !== 'object' || data === null);
}

export { isValidData, isValidJSON, isValidUser };
