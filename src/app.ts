import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import helmet from "helmet";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "./util/secrets";
import cors from "cors";

//const MongoStore = mongo(session);

// Controllers (route handlers)
import homeController from "./controllers/home";
import userController from "./controllers/user";
import logger from "./util/logger";
import passport = require("passport");
 
// API keys and Passport configuration
import "./passport/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true} ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    logger.debug("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 5500);
app.set("httpsPort", process.env.HTTPSPORT || 6500);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(helmet());


//stateless API
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     store: new MongoStore({
//         url: mongoUrl,
//         autoReconnect: true
//     })
// }));
// app.use(passport.session());

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */

app.use("/", homeController);
app.use("/user", userController);

/**
 * API examples routes.
 */

/**
 * OAuth authentication routes. (Sign in)
 */
export default app;
