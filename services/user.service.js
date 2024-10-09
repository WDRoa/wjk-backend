// const { faker } = require("@faker-js/faker");

const { models } = require("../libs/sequelize");

class UsersService {
  constructor(){
    // this.users = [];
		// this.generate();
  }

	// generate() {
	// 	// const limit = 4;
	// 	// for (let index = 1; index < limit; index++) {
	// 	// 	this.users.push({
	// 	// 		id: faker.string.uuid(),
	// 	// 		names: `User number ${index}`,
	// 	// 		lastNames: `Last names of user number ${index}`,
	// 	// 		email: `email${index}@email.com`,
	// 	// 		password: `********`,
	// 	// 		address: `Address number ${index}`
	// 	// 	}
	// 	// 	);
	// 	// }
	// }

	async find() {
		const users = await models.User.findAll();
		return users;
  }

	async findOne(id) {
		const user = await models.User.findByPk(id);
		return user;
	}

	async create(data) {
		const newUser = await models.User.create(data);
		return newUser;
	}

  async update(id, changes) {
		const userToUpdate = await this.findOne(id);
		const updatedUser = await userToUpdate.update(changes);
		return updatedUser;
	}

  async delete(id) {
		const userToDelete = await this.findOne(id);
		await userToDelete.destroy();
		return id;
  }
}

module.exports = UsersService;
