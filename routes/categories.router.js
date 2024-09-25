const express = require("express");
const boom = require("@hapi/boom");

const CategoriesService = require("../services/category.service");

const router = express.Router();
const service = new CategoriesService();

router.get("/", async (request, response, next) => {
	try {
		const categories = await service.find();
		response.json(categories);

	} catch (error) {
			next(boom.internal('Occurred while fetching all the categories', error));
		}
});

router.get("/:categoryId", async (request, response, next) => {
	const { categoryId } = request.params;

	try {
		const category = await service.findOne(categoryId);
		response.json(category);

	} catch (error) {
			next(error);
		}
});

router.post("/", async (request, response, next) => {
	const body = request.body;

	try {
		const newCategory = await service.create(body);
		response.status(201).json({ message: "Created", body: newCategory });

	} catch (error) {
			next(boom.internal('Occurred while creating a category', error));
		}
});

router.put("/:categoryId", async (request, response, next) => {
	const { categoryId } = request.params;
	const body = request.body;

	try {
		const categoryUpdated = await service.update(categoryId, body);
		response.json({ message: "Fully updated", body: categoryUpdated });

	} catch (error) {
			next(error);
		}
});

router.patch("/:categoryId", async (request, response, next) => {
	const { categoryId } = request.params;
	const body = request.body;

	try {
		const categoryUpdated = await service.update(categoryId, body);
		response.json({ message: "Partially updated", body: categoryUpdated });

	} catch (error) {
			next(error);
		}
});

router.delete("/:categoryId", async (request, response, next) => {
	const { categoryId } = request.params;

	try {
		await service.delete(categoryId);
		response.json({ message: "Deleted", id: categoryId });

	} catch (error) {
			next(error);
		}
});

module.exports = router;
