import {userController} from "./controllers/userController.js";
import { dashboardController } from "./controllers/dashboardController.js";
import { adminController } from "./controllers/adminController.js";
import { placemarkController } from "./controllers/placemarkController.js";

export const webRoutes=[
{ method: "GET", path: "/", config: userController.index },
{ method: "GET", path: "/login", config: userController.loginView},
{ method: "GET", path: "/signup", config: userController.signupView},
{ method: "POST", path:"/register", config: userController.signup},
{ method: "POST", path: "/login", config: userController.login},
{ method: "GET", path:"/logout", config: userController.logout},
{ method: "GET", path:"/settings", config: userController.settings},
{ method: "POST", path:"/changename", config: userController.changeName},
{ method: "POST", path:"/changemail", config:  userController.changeMail},
{ method: "POST", path:"/changepass", config: userController.changePass},

{ method: "GET", path:"/dashboard", config: dashboardController.index},
{ method: "POST", path:"/dashboard/addplacemark", config: dashboardController.addPlacemark},
{ method: "GET", path:"/dashboard/deleteplacemark/{id}", config: dashboardController.deletePlacemark},

{ method: "GET", path:"/placemark/{id}", config: placemarkController.index},
{ method: "POST", path:"/placemark/{id}/uploadimage", config: placemarkController.uploadImage},

{ method: "GET", path:"/admin/dashboard", config: adminController.listUser},
{ method: "GET", path:"/admin/dashboard/deleteuser/{id}", config:  adminController.deleteUser},
{ method: "GET", path:"/admin/dashboard/deleteplacemark/{id}", config: adminController.deletePlacemark},

{ method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },


];