import {userController} from "./controllers/userController.js";

export const webRoutes=[
{ method: "GET", path: "/", config: userController.index },
];