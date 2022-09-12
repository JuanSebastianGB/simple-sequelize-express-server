import { v4 as uuidv4 } from 'uuid';

const decodeString = (string) => {
  const result = Buffer.from(string, 'base64').toString('utf-8');
  return result;
};

class AuthController {
  static getConnect(req, res) {
    const incomingHeader = req.header('Authorization');
    if (!incomingHeader) return res.status(401).json({ error: 'Unauthorized' });

    const splitData = incomingHeader.substring(6);
    const buff = decodeString(splitData);
    const [user, password] = buff.split(':');
    if (!user || !password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const data = { user, password };
    return res.json({ splitData, buff, data });
  }
}

export default AuthController;
