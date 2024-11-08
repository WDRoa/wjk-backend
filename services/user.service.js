const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const { models } = require("./../libs/sequelize");

class UsersService {

	async find() {
		const users = await models.User.findAll();
		users.forEach( user => delete user.dataValues.password);
		return users;
  }

	async findByEmail(email) {
		const user = await models.User.findOne( { where: { email } } );
		return user;
  }

	async findOne(id) {
		const user = await models.User.findByPk(id);
		return user;
	}

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);
		const newUser = await models.User.create({
			userId: faker.string.uuid(),
			...data,
			password: hash,});

		delete newUser.dataValues.password;
		return newUser;
	}

  async update(id, changes) {
		const userToUpdate = await this.findOne(id);
		const updatedUser = await userToUpdate.update(changes);
		delete updatedUser.dataValues.password;
		return updatedUser;
	}

  async delete(id) {
		const userToDelete = await this.findOne(id);
		await userToDelete.destroy();
		return id;
  }
}

module.exports = UsersService;
