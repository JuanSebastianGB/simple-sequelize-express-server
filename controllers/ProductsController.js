const { Product } = require('../models');
const { Category } = require('../models');

class ProductController {
  /**
   * It creates a new product using the data from the request body and returns the response as a JSON
   * object
   * @param req - The request object.
   * @param res - The response object.
   */
  static create(req, res) {
    Product.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }

  /**
   * It finds all products and includes the category model, but only returns the description attribute of
   * the category
   * @param req - The request object.
   * @param res - The response object.
   */
  static getAll(req, res) {
    const attributes = ['description'];
    Product.findAll({ include: { model: Category, attributes } })
      .then((products) => res.json({ products }))
      .catch((err) => res.json({ err }));
  }

  /**
   * This function is used to get a single product from the database
   * @param req - The request object.
   * @param res - The response object.
   */
  static getOne(req, res) {
    const { id } = req.params;
    Product.findAll({ where: { id }, include: [{ model: Category }] })
      .then((response) => res.json({ response }))
      .catch((err) => res.status(401).json({ err }));
  }

  /**
   * It deletes a product from the database based on the id passed in the request parameters
   * @param req - The request object.
   * @param res - The response object.
   */
  static deleteOne(req, res) {
    const { id } = req.params;
    Product.destroy({ where: { id } })
      .then((response) => res.json({ response }))
      .catch((err) => res.json({ err }));
  }

  /**
   * It takes the id from the request params, and updates the product with the id with the body of the
   * request
   * @param req - The request object.
   * @param res - The response object.
   */
  static update(req, res) {
    const { id } = req.params;
    Product.update(req.body, { where: { id } })
      .then((response) => res.json({ response }))
      .catch((err) => res.json({ err }));
  }
}

module.exports = ProductController;
