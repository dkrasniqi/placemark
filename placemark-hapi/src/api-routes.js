import { userApi } from "./api/userApi.js";
import { placemarkApi } from "./api/placemarkApi.js" ;

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },

  { method: "POST", path: "/api/users/changeName", config: userApi.changeName },
  { method: "POST", path: "/api/users/changeMail", config: userApi.changeUserMail },
  { method: "POST", path: "/api/users/changePass", config: userApi.changeUserPass },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "GET", path: "/api/placemarks/user/{id}", config: placemarkApi.findPlacemarksByUser },
  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  { method: "POST", path:"api/placemark/{id}/uploadimage", config: placemarkApi.uploadImage},

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];