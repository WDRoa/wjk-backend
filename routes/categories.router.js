const express = require("express");
const boom = require("@hapi/boom");

const CategoriesService = require("../services/category.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require("../schemas/category.schema");

const router = express.Router();
const service = new CategoriesService();

router.get("/", async (request, response, next) => {
	try {
		const categories = await service.find();
		response.json(categories);

	} catch (error) {
			next(boom.internal("Occurred while fetching all the categories", error));
		}
});

router.get("/:categoryId",
	validatorHandler(getCategorySchema, "params"),
	async (request, response, next) => {
		const { categoryId } = request.params;

		try {
			const category = await service.findOne(categoryId);

			if (category.isBlock) {
					throw boom.conflict("Category is blocked");
			} else {
					response.json(category);
				}

		} catch (error) {
				next(boom.notFound("Occurred while fetching a category", error));
			}
});

router.post("/",
	validatorHandler(createCategorySchema, "body"),
	async (request, response, next) => {
		const body = request.body;

		try {
			const newCategory = await service.create(body);
			response.status(201).json({ message: "Created", body: newCategory });

		} catch (error) {
				next(boom.internal("Occurred while creating a category", error));
			}
});

router.put("/:categoryId",
	validatorHandler(getCategorySchema, "params"),
	validatorHandler(updateCategorySchema, "body"),
	async (request, response, next) => {
		const { categoryId } = request.params;
		const body = request.body;

		try {
			const categoryUpdated = await service.update(categoryId, body);
			response.json({ message: "Fully updated", body: categoryUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating a category completely", error));
			}
});

router.patch("/:categoryId",
	validatorHandler(getCategorySchema, "params"),
	validatorHandler(updateCategorySchema, "body"),
	async (request, response, next) => {
		const { categoryId } = request.params;
		const body = request.body;

		try {
			const categoryUpdated = await service.update(categoryId, body);
			response.json({ message: "Partially updated", body: categoryUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating a category partially", error));
			}
});

router.delete("/:categoryId",
	validatorHandler(getCategorySchema, "params"),
	async (request, response, next) => {
	const { categoryId } = request.params;

	try {
		await service.delete(categoryId);
		response.json({ message: "Deleted", id: categoryId });

	} catch (error) {
			next(boom.notFound("Occurred while deleting a category", error));
		}
});

module.exports = router;
