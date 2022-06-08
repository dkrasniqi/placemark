import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { userController } from "./controllers/userController.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenv.config();

  if(result.error){
    console.log(result.error.message);
  }

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  const swaggerOptions = {
    info: {
      title: "Playtime API",
      version: "0.1",
    },
  };

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register({
    plugin: HapiSwagger,
    options: swaggerOptions,
  },)
  await server.register(jwt);
  server.validator(Joi);

  

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  Handlebars.registerHelper("ifEquals", function(string1, string2, options) {
    return (string1 === string2) ? options.fn(this) : options.inverse(this);
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASS,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: userController.validate,
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASS,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  
  server.auth.default("session");

  db.init();

  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();

  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  
  process.exit(1);
});

init();