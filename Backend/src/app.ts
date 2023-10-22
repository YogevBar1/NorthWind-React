
require("dotenv").config(); //Load .env file into process.enc
import express from "express";
import appConfig from "./2-utils/app-config";
import productsController from "./6-controllers/products-controller";
import employeesController from "./6-controllers/employees-controller";
import verbose from "./4-middleware/verbose";
import doorman from "./4-middleware/doorman";
import sabbathForbidden from "./4-middleware/sabbath-forbidden";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import sanitize from "./4-middleware/sanitize";
import expressRateLimit from "express-rate-limit";
import https from "https";
import path from "path";
import fs from "fs";

// Create the server
const server = express();

// Rate Limit:
// server.use(expressRateLimit({
//     windowMs: 1000,
//     max: 2
// }));

// Enable cors:
server.use(cors()); //Enable cors for any frontend.
// server.use(cors({origin: "http://mysite.com"})); //Enable cors for that specific frontend.
// server.use(cors({origin: ["http://mysite.com", "http://yoursite.com" , "http://othersite.como"]})); //Enable cors for those specific frontend.

// Support request.body as JSON:
server.use(express.json());

// Stript tags:
server.use(sanitize);

// Support file upload - set files into request
server.use(expressFileUpload());

// Connect app- level middleware
server.use(verbose);
// server.use(doorman);
// server.use(sabbathForbidden);

// Route requests to our controllers
server.use("/api", productsController);
server.use("/api", employeesController);
server.use("/api", authController);

// Route not found
server.use("*", routeNotFound)

// Catch all middleware
server.use(catchAll);

// Run server:
if (appConfig.isDevelopment) {
    server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
}
else {
    const certFolder = path.join(__dirname, "1-assets/cert");
    const options = {

        cert: fs.readFileSync(certFolder + "/localhost_4000.crt"),
        key: fs.readFileSync(certFolder + "/localhost_4000-privateKey.key")
    }
    const sslServer = https.createServer(options, server);
    sslServer.listen(appConfig.port, () => console.log("Listening on https://localhost:" + appConfig.port));
}

