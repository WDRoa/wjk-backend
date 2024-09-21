const express = require("express");
const OrdersService = require("../services/order.service");
const service = new OrdersService();

const router = express.Router();

router.get("/", async (request, response) => {
	try {
		const orders = await service.find();
		response.json(orders);

	} catch (error) {
			response.status(500).json({
				message: "An error occurred while fetching the orders",
				error: error.message
			});
		}
});

router.get("/:orderId", async (request, response) => {
	const { orderId } = request.params;

	try {
		const order = await service.findOne(orderId);

		if (!order) {
			response.status(404).json({
				message: "order not found",
			});
		}else {
			response.json(order);
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
		const newOrder = await service.create(body);
		response.status(201).json({ message: "Created", body: newOrder });

	} catch (error) {
			response.status(500).json({
				message: "An error occurred while creating the order",
				error: error.message,
			});
		}
});

router.put("/:orderId", async (request, response) => {
	const { orderId } = request.params;
	const body = request.body;

	try {
		const orderUpdated = await service.update(orderId, body);
		response.json({ message: "Fully updated", body: orderUpdated });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while updating the order",
				error: error.message,
			});
		}
});

router.patch("/:orderId", async (request, response) => {
	const { orderId } = request.params;
	const body = request.body;

	try {
		const orderUpdated = await service.update(orderId, body);
		response.json({ message: "Partially updated", body: orderUpdated });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while partially updating the order",
				error: error.message,
			})
		}
});

router.delete("/:orderId", async (request, response) => {
	const { orderId } = request.params;

	try {
		await service.delete(orderId);
		response.json({ message: "Deleted", id: orderId });

	} catch (error) {
			response.status(404).json({
				message: "An error occurred while deleting the order",
				error: error.message,
			})
		}
});

module.exports = router;
