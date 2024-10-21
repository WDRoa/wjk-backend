const { models } = require("./../libs/sequelize");

class OrdersService {

  async find() {
		const orders = await models.Order.findAll({include: ["user"]});
		return orders;
  }

  async findOne(id) {
		const order = await models.Order.findByPk(id, { include: ["user", "items"] });
		return order;
  }

	async create(data) {
		const newOrder = await models.Order.create(data);
		return newOrder;
	}

	async addItem(data) {
		const newItem = await models.OrderProduct.create(data);
		return newItem;
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
