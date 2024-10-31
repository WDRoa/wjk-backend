const boom = require("@hapi/boom");
const { config } = require("./../config/config");

const checkApiKey = (request, response, next) => {
    const apiKey = request.headers["api"];

    if (apiKey === config.apiKey) {
        next();
    } else {
				(boom.unauthorized());
			}
}

const checkRoles = (...roles) => {
  return (request, response, next) => {
    const user = request.user;

    if (roles.includes(user.role)) {
      next();
    } else {
				next(boom.unauthorized());
			}
  }
}

module.exports = { checkApiKey, checkRoles };


