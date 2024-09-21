const { faker } = require("@faker-js/faker");

class OrdersService {

  constructor(){
    this.orders = [];
		this.generate();
  }

	generate() {
		const limit = 4;
		for (let index = 1; index < limit; index++) {
			this.orders.push({
				id: faker.string.uuid(),
				name: `Order number ${index}`,
				products: `${index} products`
			}
			);
		}
	}

  async create(data) {
		const newOrder = {
			id: faker.string.uuid(),
			...data
		}
		this.orders.push(newOrder);
		return newOrder;
	}

  async find() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(this.orders);
			}, 2000);
		})
  }

  async findOne(id) {
    return this.orders.find(item => item.id === id);
  }

  async update(id, changes) {
		const index = this.orders.findIndex(item => item.id === id);
		if(index === -1){
			throw new Error('order not found');
		}
		const orderToUpdate = this.orders[index];
		this.orders[index] = {...orderToUpdate, ...changes};
		return this.orders[index];
	}

  async delete(id) {
		const index = this.orders.findIndex(item => item.id === id);
		if(index === -1){
			throw new Error('order not found');
		}
		this.orders.splice(index, 1);
		return id;
  }
}

module.exports = OrdersService;
