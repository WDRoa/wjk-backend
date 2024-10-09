// const { faker } = require("@faker-js/faker");

const { models } = require("../libs/sequelize");

class ProductsService {

  constructor(){
    // this.products = [];
    // this.generate();
  }

  generate() {
    // const limit = 5;
    // for (let index = 1; index < limit; index++) {
    //   this.products.push({
    //     id: faker.string.uuid(),
    //     name: faker.commerce.productName(),
    //     price: parseInt(faker.commerce.price(), 10),
		// 		image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
		// 		isBlock: faker.datatype.boolean(),
    //   });
    // }
  }
	async find() {
		const products = await models.Product.findAll();
		return products;
	}

	async findOne(id) {
		const product = await models.Product.findByPk(id);
		return product;
	}

  async create(data) {
		const newProduct = await models.Product.create(data);
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
