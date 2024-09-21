const express = require("express");

const ProductsService = require("../services/product.service");

const router = express.Router();
const service = new ProductsService();

router.get("/", async (request, response) => {
	try {
		const products = await service.find();
		response.json(products);

	} catch (error) {
			response.status(500).json({
				message: "An error occurred while fetching the products",
				error: error.message
			});
		}
});

router.get("/:productId", async (request, response) => {
  const { productId } = request.params;

  try {
    const product = await service.findOne(productId);

    if (!product) {
      return response.status(404).json({
        message: "Product not found",
      });
    }

    response.json(product);

  } catch (error) {
			response.status(500).json({
				message: "An error occurred while fetching the product",
				error: error.message,
			});
  	}
});

router.post("/", async (request, response) => {
  const body = request.body;

  try {
    const newProduct = await service.create(body);
    response.status(201).json({ message: "Created", body: newProduct });

  } catch (error) {
			response.status(500).json({
				message: "An error occurred while creating the product",
				error: error.message,
			});
 	 	}
});


router.put("/:productId", async (request, response) => {
	const { productId } = request.params;
	const body = request.body;
	try {
		const productUpdated = await service.update(productId, body);
		response.json({ message: "Fully updated", body: productUpdated });

	} catch (error) {
			response.status(404).json({
				message: error.message,
			})
		}
});

router.patch("/:productId", async (request, response) => {
	const { productId } = request.params;
	const body = request.body;
	try {
		const productUpdated = await service.update(productId, body);
		response.json({ message: "Partially updated", body: productUpdated });

	} catch (error) {
			response.status(404).json({
				message: error.message,
			})
		}
});

router.delete("/:productId", async (request, response) => {
	const { productId } = request.params;

	try {
		await service.delete(productId);
		response.json({ message: "Deleted", id: productId });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while deleting the product",
				error: error.message,
			})
		}
});

module.exports = router;

