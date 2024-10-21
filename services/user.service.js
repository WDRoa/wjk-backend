const { models } = require("./../libs/sequelize");

class UsersService {

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
