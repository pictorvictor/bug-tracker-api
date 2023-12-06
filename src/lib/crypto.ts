import { customAlphabet } from 'nanoid';

export const generateRandomString = (length: number) => {
  const allowedChars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nanoid = customAlphabet(allowedChars, length);
  return nanoid();
};
