const express = require("express");
const cors = require("cors");
const passport = require("./utils/auth");
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);

app.use(express.json());

const whiteList = ["http://localhost:5173","http://localhost:5174","http://localhost:8080", "http://localhost:8081", "http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed!"));
		}
	},
}

app.use(cors(corsOptions));
app.use(passport.initialize());
routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);





