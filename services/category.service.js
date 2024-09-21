const { faker } = require("@faker-js/faker");

class CategoriesService {

  constructor(){
    this.categories = [];
		this.generate();
  }

	generate() {
		const limit = 4;
		for (let index = 1; index < limit; index++) {
			this.categories.push({	id: faker.string.uuid(), name: `Category number ${index}`,	});
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
    return this.categories.find(item => item.id === id);
  }

  async update(id, changes) {

		const index = this.categories.findIndex(item => item.id === id);
		if(index === -1){
			throw new Error('category not found');
		}
		const categoryToUpdate = this.categories[index];
		this.categories[index] = {...categoryToUpdate, ...changes};
		return this.categories[index];
  }

  async delete(id) {
		const index = this.categories.findIndex(item => item.id === id);
		if(index === -1){
			throw new Error('category not found');
		}
		this.categories.splice(index, 1);
		return id;
  }
}

module.exports = CategoriesService;
