const express = require("express");
const passport = require("passport");

const OrderService = require("./../services/order.service");
const { verifyToken } = require("./../middlewares/auth.handler");

const router = express.Router();
const service = new OrderService();

router.get("/my-orders",
  passport.authenticate("jwt", {session: false}),
	verifyToken,
  async (request, response, next) => {
		const user = request.user;

    try {
      const orders = await service.findByUser(user.sub); //sub = userId
      response.json(orders);

    } catch (error) {
				next(error);
			}
  }
);

module.exports = router;
