import redisClient from '../utils/redis';

class AppController {
  /**
   * If the redis client is alive and the database
   *  client is alive, return a 200 status code with a JSON
   * object that has a redis key with a value of true and a db key with a value of true
   * @param req - The request object
   * @param res - The response object
   */
  static getStatus(req, res) {
    if (redisClient.isAlive()) return res.status(200).json({ redis: true });
    return res.status(400).json({ redis: false });
  }

  /**
   * We generate a random number, store it in Redis, and then retrieve it
   * @param req - The request object.
   * @param res - The response object.
   */
  static randomNumber(req, res) {
    const randomNumber = Math.floor(Math.random() * 10000);
    redisClient.client.set('random-number', randomNumber, (err) => {
      if (err) return res.status(500).send('Server Error');
      redisClient.client.get('random-number', (err, randomNumber) => {
        if (err) return res.status(500).send('Server Error');
        return res.status(200).send({ randomNumber });
      });
      return false;
    });
  }
}

export default AppController;
