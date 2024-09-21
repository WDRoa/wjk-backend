const express = require("express");
const CategoriesService = require("../services/category.service");
const service = new CategoriesService();

const router = express.Router();

router.get("/", async (request, response) => {
	try {
		response.json(await service.find());

	} catch (error) {
			response.status(500).json({
				message: "An error occurred while fetching the categories",
				error: error.message,
			});
		}
});

router.get("/:categoryId", async (request, response) => {
	const { categoryId } = request.params;

	try {
		const category = await service.findOne(categoryId);

		if (!category) {
			response.status(404).json({
				message: "category not found",
			});
		}else {
			response.json(category);
		}
	} catch (error) {
			response.status(404).json({
				message: "An error occurred while fetching the category",
				error: error.message,
			})
		}
});

router.post("/", async (request, response) => {
	const body = request.body;
try {
	const newCategory = await service.create(body);
	response.status(201).json({ message: "Created", body: newCategory });

} catch (error) {
		response.status(500).json({
			message: "An error occurred while creating the category",
			error: error.message,
		});
	}
});

router.put("/:categoryId", async (request, response) => {
	const { categoryId } = request.params;
	const body = request.body;

	try {
		const categoryUpdated = await service.update(categoryId, body);
		response.json({ message: "Fully updated", body: categoryUpdated });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while updating the category",
				error: error.message,
			});
		}
});

router.patch("/:categoryId", async (request, response) => {
	const { categoryId } = request.params;
	const body = request.body;

	try {
		const categoryUpdated = await service.update(categoryId, body);
		response.json({ message: "Partially updated", body: categoryUpdated });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while partially updating the category",
				error: error.message,
			});
		}
});

router.delete("/:categoryId", async (request, response) => {
	const { categoryId } = request.params;

	try {
		await service.delete(categoryId);
		response.json({ message: "Deleted", id: categoryId });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while deleting the category",
				error: error.message,
			});
		}
});

module.exports = router;
