const express = require("express");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.get("/", (request, response) => {
	const products = [];
	for (let i = 0; i < 10; i++) {
		products.push({
			name: faker.commerce.productName(),
			price: parseInt(faker.commerce.price(), 10),
			description: faker.commerce.productDescription(),
			image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
		});
	}

	response.json(products);
});

router.get("/:productId", (request, response) => {
	const { productId } = request.params;

	response.json({ productId, name: "apple", price: 200 })});

router.post("/", (request, response) => {
	const body = request.body;

	response.json({ message: "Created", body });
});

router.put("/:productId", (request, response) => {
	const { productId } = request.params;
	const body = request.body;

	response.json({ message: "Fully updated", productId, body });
});

router.patch("/:productId", (request, response) => {
	const { productId } = request.params;
	const body = request.body;

	response.json({ message: "Partially updated", productId, body });
});

router.delete("/:productId", (request, response) => {
	const { productId } = request.params;

	response.json({ message: "Deleted", id: productId });
});

module.exports = router;

