// const { faker } = require("@faker-js/faker");

const { models } = require("../libs/sequelize");

class OrdersService {

  constructor(){
    // this.orders = [];
		// this.generate();
  }

	generate() {
		// const limit = 4;
		// for (let index = 1; index < limit; index++) {
		// 	this.orders.push({
		// 		id: faker.string.uuid(),
		// 		date: `2024/11/${index}`,
		// 		quantityOfProducts: index,
		// 		total: index * 5,
		// 	}
		// 	);
		// }
	}

  async find() {
		const orders = await models.Order.findAll();
		return orders;
  }

  async findOne(id) {
		const order = await models.Order.findByPk(id);
		return order;
  }

	async create(data) {
		const newOrder = await models.Order.create(data);
		return newOrder;
	}

  async update(id, changes) {
		const orderToUpdate = await this.findOne(id);
		const updatedOrder = await orderToUpdate.update(changes);
		return updatedOrder;
	}

  async delete(id) {
		const orderToDelete = await this.findOne(id);
		await orderToDelete.destroy();
		return id;
  }
}

module.exports = OrdersService;
