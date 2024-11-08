const express = require("express");
const passport = require("passport");

const AuthService = require("./../services/auth.service");

const router = express.Router();
const service = new AuthService();

router.post("/login",
  passport.authenticate("local", {session: false}),
  async (request, response, next) => {
		const user = request.user;

    try {
			response.json(service.signToken(user));

    } catch (error) {
				next(error);
			}
  }
);

router.post("/recovery",
  async (request, response, next) => {
		const { email } = request.body;

    try {
      const response2 = await service.sendRecovery(email);
      response.json(response2);

    } catch (error) {
				next(error);
			}
  }
);

router.post("/change-password",
  async (request, response, next) => {
		const { token, newPassword } = request.body;

    try {
      const response2 = await service.changePassword(token, newPassword);
      response.json(response2);

    } catch (error) {
				next(error);
			}
  }
);

module.exports = router;

