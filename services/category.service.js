// const { faker } = require("@faker-js/faker");

const { models } = require("../libs/sequelize");

class CategoriesService {

  constructor(){
    // this.categories = [];
		// this.generate();
  }

	generate() {
		// const limit = 4;
		// for (let index = 1; index < limit; index++) {
		// 	this.categories.push({
		// 		id: faker.string.uuid(),
		// 		name: `Category number ${index}`,
		// 		image: `https://imageOfCategory${index}.jpg`,});
		// }
	}

  async find() {
		const categories = await models.Category.findAll();
		return categories;
  }

  async findOne(id) {
		const category = await models.Category.findByPk(id);
		return category;
	}

	async create(data) {
		const newCategory = await models.Category.create(data);
		return newCategory;
	}

  async update(id, changes) {
		const categoryToUpdate = await this.findOne(id);
		const updatedCategory = await categoryToUpdate.update(changes);
		return updatedCategory;
  }

  async delete(id) {
		const categoryToDelete = await this.findOne(id);
		categoryToDelete.destroy();
		return id;
  }
}

module.exports = CategoriesService;
