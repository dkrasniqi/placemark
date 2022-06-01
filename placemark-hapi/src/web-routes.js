import {userController} from "./controllers/userController.js";

export const webRoutes=[
{ method: "GET", path: "/", config: userController.index },
{ method: "GET", path: "/login", config: userController.loginView},
{ method: "GET", path: "/signup", config: userController.signupView},

];