const { faker } = require("@faker-js/faker");
const { models } = require("./../libs/sequelize");

class CategoriesService {
  async find() {
		const categories = await models.Category.findAll();
		return categories;
  }

  async findOne(id) {
		const category = await models.Category.findByPk(id, { include: ["products"] });
		return category;
	}

	async create(data) {
		const newCategory = await models.Category.create({ categoryId: faker.string.uuid(), ...data });
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
