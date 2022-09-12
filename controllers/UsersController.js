import crypto from 'crypto';

const { User } = require('../models');

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

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ err: 'Missing Email' });
    if (!password) return res.status(400).json({ err: 'Missing password' });

    const hashedPassword = hashPasswd(password);

    const userFound = await User.findAll({ where: { email } });
    if (userFound.length > 0) return res.json({ err: 'Already exists' });
    const userToCreate = { email, password: hashedPassword };
    const userCreated = await User.create(userToCreate);
    return res.json({ userCreated });
  }
}
export default UsersController;
