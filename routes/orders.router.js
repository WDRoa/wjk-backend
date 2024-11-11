const express = require("express");
const boom = require("@hapi/boom");
const passport = require("passport");
const { faker } = require("@faker-js/faker");

const OrdersService = require("./../services/order.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { checkRoles, verifyToken } = require("./../middlewares/auth.handler");
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require("./../schemas/order.schema");

const router = express.Router();
const service = new OrdersService();

router.get("/",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	async (request, response, next) => {
	try {
		const orders = await service.find();
		response.json(orders);

	} catch (error) {
			next(boom.internal("Occurred while fetching all the orders", error));
		}
});

router.get("/:orderId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getOrderSchema, "params"),
	async (request, response, next) => {
		const { orderId } = request.params;

		try {
			const order = await service.findOne(orderId);

			if (order.isBlock) {
					throw boom.conflict("Order is blocked");
			} else {
					response.json(order);
				}

		} catch (error) {
				next(boom.notFound("Occurred while fetching an order", error));
			}
});

router.post("/",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	validatorHandler(createOrderSchema, "body"),
	async (request, response, next) => {
		const body = request.body;
		const bodyWithUserId = { ...body, userId: request.user.sub};

		try {
			const newOrder = await service.create(bodyWithUserId);
			response.status(201).json({ message: "Created", body: newOrder });

		} catch (error) {
				next(boom.internal("Occurred while creating an order", error));
			}
});

router.post("/add-item",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	validatorHandler(addItemSchema, "body"),
	async (request, response, next) => {
		const body = request.body;
		const orderProductWithId = { orderProductId: faker.string.uuid(), ...body };

		try {
			const newItem = await service.addItem(orderProductWithId);
			response.status(201).json({ message: "Added", body: newItem });

		} catch (error) {
				next(boom.internal("Occurred while adding an item", error));
			}
});

router.put("/:orderId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getOrderSchema, "params"),
	validatorHandler(updateOrderSchema, "body"),
	async (request, response, next) => {
		const { orderId } = request.params;
		const body = request.body;

		try {
			const orderUpdated = await service.update(orderId, body);
			response.json({ message: "Fully updated", body: orderUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating an order completely", error));
			}
});

router.patch("/:orderId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getOrderSchema, "params"),
	validatorHandler(updateOrderSchema, "body"),
	async (request, response, next) => {
		const { orderId } = request.params;
		const body = request.body;

		try {
			const orderUpdated = await service.update(orderId, body);
			response.json({ message: "Partially updated", body: orderUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating an order partially", error));
			}
});

router.delete("/:orderId",
	passport.authenticate("jwt", { session: false }),
	verifyToken,
	checkRoles("admin"),
	validatorHandler(getOrderSchema, "params"),
	async (request, response, next) => {
		const { orderId } = request.params;

		try {
			await service.delete(orderId);
			response.json({ message: "Deleted", id: orderId });

		} catch (error) {
				next(boom.notFound("Occurred while deleting an order", error));
			}
});

module.exports = router;
