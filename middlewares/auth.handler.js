const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { config } = require("./../config/config");

const checkApiKey = (request, response, next) => {
    const apiKey = request.headers["api"];

    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
};

const checkRoles = (...roles) => {
    return (request, response, next) => {
        const user = request.user;

        if (roles.includes(user.role)) {
            next();
        } else {
            next(boom.unauthorized());
        }
    };
};

const verifyToken = (request, response, next) => {
    try {
        const accessToken = request.headers.authorization.split(" ")[1];
        const payload = jwt.verify(accessToken, config.jwtSecret);

        const expiresSoon = payload.exp * 1000 - Date.now() < 10 * 60 * 1000;
        if (expiresSoon) {
            const newAccessToken = jwt.sign(
                { sub: payload.sub, role: payload.role },
                config.jwtSecret,
                { expiresIn: "60min" }
            );
            response.set("new-access-token", newAccessToken);
        }

        request.user = payload;
        next();

    } catch (error) {
        response.status(401).json({ message: "Unauthorized" });
    	}
};

module.exports = { checkApiKey, checkRoles, verifyToken };
