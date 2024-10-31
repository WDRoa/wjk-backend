const express = require("express");

const usersRouter = require("./users.router");
const productsRouter = require("./products.router");
const ordersRouter = require("./orders.router");
const categoriesRouter = require("./categories.router");
const authRouter = require("./auth.router");

const routerApi = app => {
	const router = express.Router();
	app.use("/api/v1", router);
	router.use("/users", usersRouter);
	router.use("/products", productsRouter);
	router.use("/categories", categoriesRouter);
	router.use("/orders", ordersRouter);
	router.use("/auth", authRouter);
};

module.exports = routerApi;
