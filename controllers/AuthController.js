import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import redisClient from '../utils/redis';

const { User } = require('../models');

const error = 'Unauthorized';

/**
 * Decode a base64 encoded string into a utf-8 string.
 * @param string - The string to be decoded.
 * @returns The decoded string.
 */
const decodeString = (string) => {
  const result = Buffer.from(string, 'base64').toString('utf-8');
  return result;
};

/**
 * It takes a string, hashes it, and returns the hash
 * @param pwd - The password to be hashed.
 * @returns The hashed password.
 */
const hashPasswd = (pwd) => {
  const hash = crypto.createHash('sha1');
  const data = hash.update(pwd, 'utf-8');
  const genHash = data.digest('hex');
  return genHash;
};

class AuthController {
  /**
   * It checks if the user is authorized, if so, it creates a token and stores it in redis
   * @param req - The request object.
   * @param res - the response object
   * @returns A token
   */
  static async getConnect(req, res) {
    const incomingHeader = req.header('Authorization');
    if (!incomingHeader) return res.status(401).json({ error });

    const splitData = incomingHeader.substring(6);
    const buff = decodeString(splitData);
    const [email, password] = buff.split(':');
    if (!email || !password) {
      return res.status(401).json({ error });
    }
    const hashedPassword = hashPasswd(password);
    const userToFind = { email, password: hashedPassword };
    const userFound = await User.findAll({ where: userToFind });

    if (userFound.length <= 0) return res.json({ error: 'Not Found' });
    const key = uuidv4();
    const token = `auth_${key}`;
    const { id } = userFound[0];
    await redisClient.set(token, id, 86400);
    return res.json({ token: key });
  }

  static async getDisconnect(req, res) {
    const key = req.header('X-Token');
    if (!key || key.length === 0) {
      return res.status(401).json({ error });
    }
    if (await redisClient.get(`auth_${key}`)) {
      await redisClient.del(`auth_${key}`);
      return res.status(204).end();
    }
    return res.status(401).json({ error });
  }
}

export default AuthController;
