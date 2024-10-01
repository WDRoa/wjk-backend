const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/error.handler");

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

app.get("/api", (request, response) => response.send("WJK-Backend-Home"));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);





