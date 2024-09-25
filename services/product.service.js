const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 1; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
				image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
				isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
		const newProduct = {
			id: faker.string.uuid(),
			...data
		}
		this.products.push(newProduct);
		return newProduct;
  }

  async find() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(this.products);
			}, 2000);
		})
  }

  async findOne(id) {
		const product = this.products.find(item => item.id === id);

		if (!product) {
			throw boom.notFound('Occurred while finding a product');
		}

		if (product.isBlock) {
			throw boom.conflict('Product is blocked');
		}

		return product;
	}

  async update(id, changes) {
		const index = this.products.findIndex(item => item.id === id);

		if(index === -1){
			throw boom.notFound("Occurred while updating a product");
		}

		const productToUpdate = this.products[index];
		this.products[index] = {...productToUpdate, ...changes};
		return this.products[index];
  }

  async delete(id) {
		const index = this.products.findIndex(item => item.id === id);

		if(index === -1){
			throw boom.notFound("Occurred while deleting a product");
		}
		this.products.splice(index, 1);
		return id;
	}
}

module.exports = ProductsService;
