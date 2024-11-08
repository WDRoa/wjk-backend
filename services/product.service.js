const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const { models } = require("./../libs/sequelize");

class ProductsService {

	async find(query) {
		const options = {
			include: ["category"],
			where: {}
		}
		const { limit, offset } = query;
		if (limit && offset) {
			options.limit = limit;
			options.offset = offset;
		}

		const { price } = query;
		if (price) {
			options.where.price = price;
		}

		const { price_min, price_max } = query;
		if (price_min && price_max) {
			options.where.price = {
				[Op.gte]: price_min,
				[Op.lte]: price_max
			}
		}

		const products = await models.Product.findAll(options);
		return products;
	}

	async findOne(id) {
		const product = await models.Product.findByPk(id);
		return product;
	}

  async create(data) {
		const newProduct = await models.Product.create({ productId: faker.string.uuid(), ...data });
		return newProduct;
  }

  async update(id, changes) {
		const productToUpdate = await this.findOne(id);
		const updatedProduct = await productToUpdate.update(changes);
		return updatedProduct;
  }

  async delete(id) {
		const productToDelete = await this.findOne(id);
		await productToDelete.destroy();
		return id;
	}
}

module.exports = ProductsService;
