const express = require("express");
const boom = require("@hapi/boom");

const ProductsService = require("../services/product.service");

const router = express.Router();
const service = new ProductsService();

router.get("/", async (request, response, next) => {
  try {
    const products = await service.find();
    response.json(products);

  } catch (error) {
    next(boom.internal('Occurred while fetching all the products', error));
  	}
});

router.get("/:productId", async (request, response, next) => {
  const { productId } = request.params;

  try {
    const product = await service.findOne(productId);
		response.json(product);

  } catch (error) {
			next(error);
  	}
});

router.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const newProduct = await service.create(body);
    response.status(201).json({ message: "Created", body: newProduct });

  } catch (error) {
    next(boom.internal('Occurred while creating a product', error));
		}
});

router.put("/:productId", async (request, response, next) => {
	const { productId } = request.params;
	const body = request.body;

	try {
		const productUpdated = await service.update(productId, body);
		response.json({ message: "Fully updated", body: productUpdated });

	} catch (error) {
			next(error);
		}
});

router.patch("/:productId", async (request, response, next) => {
	const { productId } = request.params;
	const body = request.body;

	try {
		const productUpdated = await service.update(productId, body);
		response.json({ message: "Partially updated", body: productUpdated });

	} catch (error) {
			next(error);
		}
});

router.delete("/:productId", async (request, response, next) => {
	const { productId } = request.params;

	try {
		await service.delete(productId);
		response.json({ message: "Deleted", id: productId });

	} catch (error) {
			next(error);
		}
});

module.exports = router;

