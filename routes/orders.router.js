const express = require("express");

const router = express.Router();

router.get("/", (request, response) => response.json([{count: "3 products (fake)"}, {count: "5 orders (fake)"}]));

router.get("/:orderId", (request, response) => {
	const { orderId } = request.params;

	response.json({ orderId, count: "3 products" });
});

router.post("/", (request, response) => {
	const body = request.body;

	response.json({ message: "Created", body });
});

router.put("/:orderId", (request, response) => {
	const { orderId } = request.params;
	const body = request.body;

	response.json({ message: "Fully updated", orderId, body });
});

router.patch("/:orderId", (request, response) => {
	const { orderId } = request.params;
	const body = request.body;

	response.json({ message: "Partially updated", orderId, body });
});

router.delete("/:orderId", (request, response) => {
	const { orderId } = request.params;

	response.json({ message: "Deleted", id: orderId });
});

module.exports = router;
