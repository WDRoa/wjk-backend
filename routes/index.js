const express = require("express");
const { checkApiKey } = require("../middlewares/auth.handler");

const usersRouter = require("./users.router");
const productsRouter = require("./products.router");
const ordersRouter = require("./orders.router");
const categoriesRouter = require("./categories.router");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");

const routerApi = app => {
	const router = express.Router();
	app.use("/api/v1", router);

	router.get("/", checkApiKey, (request, response) => response.send("Welcome to the WJK backend! 🙂"));

	router.use("/users", usersRouter);
	router.use("/products", productsRouter);
	router.use("/categories", categoriesRouter);
	router.use("/orders", ordersRouter);
	router.use("/auth", authRouter);
	router.use("/profile", profileRouter);
};

module.exports = routerApi;
