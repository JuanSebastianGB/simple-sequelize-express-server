const { Category } = require('../models');
class CategoriesController {
  /**
   * It creates a new category in the database using the data sent in the request body
   * @param req - The request object.
   * @param res - The response object.
   */
  static create(req, res) {
    Category.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }
}
module.exports = CategoriesController;
