// get Date
import jwt from 'jsonwebtoken';

export async function getLocalDate():Promise <Date> {
    const now = new Date();
    const date = new Date(now.toISOString());
    return date
}

import { pbkdf2 } from 'crypto';
const envSalt = process.env.SALT!

// generate hash for password
export async function generateHash(password: string, salt: string = envSalt, iterations: number = 1000, keyLength: number = 64, algo: string = 'sha512'): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      pbkdf2(password, salt, iterations, keyLength, algo, (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve(derivedKey.toString('hex'));
        }
      });
    });
  }