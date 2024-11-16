const express = require("express");
// const { checkApiKey } = require("../middlewares/auth.handler");

const usersRouter = require("./users.router");
const productsRouter = require("./products.router");
const ordersRouter = require("./orders.router");
const categoriesRouter = require("./categories.router");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");

const routerApi = app => {
	const router = express.Router();
	app.use("/api/v1", router);

	router.get("/", (request, response) => response.send(`
		<div>
			<h1 align="center">🙂 Welcome to the WJK backend! 🙂</h1>

			<h3 align="center">At the moment, the GET endpoints /products and /categories are completely public and<br>
												can be viewed directly from the browser. The other endpoints and functionalities<br>
												can be tested through postman or insomnia.</h3>

			<p align="center">Currently, the administrative user's email is <strong>default@user.com</strong> and their
				password is <strong>Passw@rd1</strong>. This user can use all the API endpoints, which are:<br>

					<h3 align="center">/auth/login</h3>
					<p align="center">(So that every user can log in)</p>
					<h3 align="center">/auth/refresh-token</h3>
					<p align="center">(So that every user doesn't have to log in before 15 days)</p>
					<h3 align="center">/auth/recovery</h3>
					<p align="center">(So that every user can start a password reset process)</p>
					<h3 align="center">/auth/change-password</h3>
					<p align="center">(So that every user can reset their password)</p>
					<h3 align="center">/products</h3>
					<p align="center">(To view and manage all products)</p>
					<h3 align="center">/categories</h3>
					<p align="center">(To view and manage all categories)</p>
					<h3 align="center">/users</h3>
					<p align="center">(To view and manage all users)</p>
					<h3 align="center">/orders</h3>
					<p align="center">(To view and manage all orders)</p>
					<h3 align="center">/profile/my-orders</h3>
					<p align="center">(So that every user can view all their orders)</p>

					<h3 align="center">The information required to create, update and delete entity instances will be provided by data validation performed by the middlewares.</h3>
					<h2 align="center">😊 I wish you a good understanding of the API and have a excellent day! 😊</h2>
			</p>
		</div>`));

	router.use("/users", usersRouter);
	router.use("/products", productsRouter);
	router.use("/categories", categoriesRouter);
	router.use("/orders", ordersRouter);
	router.use("/auth", authRouter);
	router.use("/profile", profileRouter);
};

module.exports = routerApi;
