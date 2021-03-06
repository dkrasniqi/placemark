/* eslint-disable prefer-destructuring */
import { db } from "../models/db.js";

export const adminController = {
  listUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (loggedInUser.role !== "admin") {
        return h.response("Access denied");
      }
      const users = await db.userStore.getAllUsers();
      const placemarks = await db.placemarkStore.getAllPlacemarks();
      const data = {
        title: "Users",
        user: loggedInUser,
        users: users,
        placemarks: placemarks,
      };
      return h.view("admin", data);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (loggedInUser.role !== "admin") {
        return h.response("Action denied");
      }
      const id = request.params.id;
      await db.userStore.deleteUserById(id);
      return h.redirect("/admin/dashboard");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      if (loggedInUser.role !== "admin") {
        return h.response("Action denied");
      }
      const id = request.params.id;
      await db.placemarkStore.deletePlacemarkById(id);
      return h.redirect("/admin/dashboard");
    },
  },
};
