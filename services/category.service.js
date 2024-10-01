const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class CategoriesService {

  constructor(){
    this.categories = [];
		this.generate();
  }

	generate() {
		const limit = 4;
		for (let index = 1; index < limit; index++) {
			this.categories.push({
				id: faker.string.uuid(),
				name: `Category number ${index}`,
				image: `https://imageOfCategory${index}.jpg`,});
		}
	}

  async create(data) {
		const newCategory = {
			id: faker.string.uuid(),
			...data
		}
		this.categories.push(newCategory);
		return newCategory;
  }

  async find() {
    return new Promise(resolve => {
			setTimeout(() => {
				resolve(this.categories);
			}, 2000);
		})
  }

  async findOne(id) {
    const category = this.categories.find(item => item.id === id);

		if (!category) {
			throw boom.notFound("Occurred while finding a category");
		}

		return category;
  }

  async update(id, changes) {
		const index = this.categories.findIndex(item => item.id === id);

		if(index === -1){
			throw boom.notFound("Occurred while updating a category");
		}

		const categoryToUpdate = this.categories[index];
		this.categories[index] = {...categoryToUpdate, ...changes};
		return this.categories[index];
  }

  async delete(id) {
		const index = this.categories.findIndex(item => item.id === id);

		if(index === -1){
			throw boom.notFound("Occurred while deleting a category");
		}
		this.categories.splice(index, 1);
		return id;
  }
}

module.exports = CategoriesService;
