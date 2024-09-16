const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {response.json([{ name: "electronics (fake2)" }, { name: "jewelery (fake2)" }])});

router.get("/:categoryId", (request, response) => {
	const { categoryId } = request.params;

	response.json({ categoryId, name: "electronics" })});

router.post("/", (request, response) => {
	const body = request.body;

	response.json({ message: "Created", body });
});

router.put("/:categoryId", (request, response) => {
	const { categoryId } = request.params;
	const body = request.body;

	response.json({ message: "Fully updated", categoryId, body });
});

router.patch("/:categoryId", (request, response) => {
	const { categoryId } = request.params;
	const body = request.body;

	response.json({ message: "Partially updated", categoryId, body });
});

router.delete("/:categoryId", (request, response) => {
	const { categoryId } = request.params;

	response.json({ message: "Deleted", id: categoryId });
});

module.exports = router;
