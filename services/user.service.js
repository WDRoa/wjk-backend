const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class UsersService {

  constructor(){
    this.users = [];
		this.generate();
  }

	generate() {
		const limit = 4;
		for (let index = 1; index < limit; index++) {
			this.users.push({
				id: faker.string.uuid(),
				name: `User number ${index}`,
				email: `Email ${index}`,
				password: `*****`,
				address: `Address number ${index}`
			}
			);
		}
	}

  async create(data) {
		const newUser = {
			id: faker.string.uuid(),
			...data
		}
		this.users.push(newUser);
		return newUser;
	}

  async find() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(this.users);
			}, 2000);
		})
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);

		if (!user) {
			throw boom.notFound('Occurred while finding an user');
		}

		return user;
  }

  async update(id, changes) {
		const index = this.users.findIndex(item => item.id === id);

		if(index === -1){
				throw boom.notFound("Occurred while updating an user");
		}

		const userToUpdate = this.users[index];
		this.users[index] = {...userToUpdate, ...changes};
		return this.users[index];
	}

  async delete(id) {
		const index = this.users.findIndex(item => item.id === id);

		if(index === -1){
			throw boom.notFound("Occurred while deleting an user");
		}
		this.users.splice(index, 1);
		return id;
  }
}

module.exports = UsersService;
