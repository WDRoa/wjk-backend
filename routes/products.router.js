const express = require("express");
const boom = require("@hapi/boom");
const passport = require("passport");

const ProductsService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { checkRoles, verifyToken } = require("./../middlewares/auth.handler");
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require("./../schemas/product.schema");

const router = express.Router();
const service = new ProductsService();

router.get("/",
	validatorHandler(queryProductSchema, "query"),
	async (request, response, next) => {
		try {
			const products = await service.find(request.query);
			response.json(products);

		} catch (error) {
				next(boom.internal("Occurred while fetching all the products", error));
			}
});

router.get("/:productId",
	validatorHandler(getProductSchema, "params"),
	async (request, response, next) => {
		const { productId } = request.params;

		try {
			const product = await service.findOne(productId);

			if (product.isBlock) {
					throw boom.conflict("Product is blocked");
			}	else {
					response.json(product);
				}

		} catch (error) {
				next(boom.notFound("Occurred while fetching an product", error));
			}
});

router.post("/",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(createProductSchema, "body"),
	async (request, response, next) => {
		const body = request.body;

		try {
			const newProduct = await service.create(body);
			response.status(201).json({ message: "Created", body: newProduct });

		} catch (error) {
				next(boom.internal("Occurred while creating a product", error));
			}
});

router.put("/:productId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getProductSchema, "params"),
	validatorHandler(updateProductSchema, "body"),
	async (request, response, next) => {
		const { productId } = request.params;
		const body = request.body;

		try {
			const productUpdated = await service.update(productId, body);
			response.json({ message: "Fully updated", body: productUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating an product completely", error));
			}
});

router.patch("/:productId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getProductSchema, "params"),
	validatorHandler(updateProductSchema, "body"),
	async (request, response, next) => {
		const { productId } = request.params;
		const body = request.body;

		try {
			const productUpdated = await service.update(productId, body);
			response.json({ message: "Partially updated", body: productUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating an product partially", error));
			}
});

router.delete("/:productId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getProductSchema, "params"),
	async (request, response, next) => {
	const { productId } = request.params;

	try {
		await service.delete(productId);
		response.json({ message: "Deleted", id: productId });

	} catch (error) {
			next(boom.notFound("Occurred while deleting an product", error));
		}
});

module.exports = router;

