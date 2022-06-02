import { UserCredentialsSpec, UserSpec } from "../models/joi.js";
import { db } from "../models/db.js";

export const userController = {
  index: {
    handler: function(request, h){
      return h.view("welcome", {title: "Welcome to the test page of placemark"});
    },
  },

  loginView: {
    handler: function(request, h){
      return h.view("login", {title: "Please log into your account"});
    },
  },

  signupView: {
    handler: function(request, h){
      return h.view("signup", {title: "Please create an account"});
    },
  },

  signup: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        // Add error page
        return h.view("welcome", { title: "Sign up error"}).takeover().code(400);
      }},

    handler: async function(request, h){
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/login");
    },
  },

  login: {
    validate: {
      payload: UserCredentialsSpec ,
      options: {abortEarly: false},
      failAction: function (request, h, error){
        // Add error page
        return h.view("login", {title: "Logging in error"}).takeover().code(400);
      }
    },

    handler: async function(request, h){
      const user = request.payload;
      const userCheck = await db.userStore.getUserByEmail(user.email);
      if(!userCheck|| user.password !== userCheck.password){
        // Add error page
        return h.view("login", {title: "Logging in error"}).takeover().code(400);
      }
      return h.view("welcome", {title: "Loggin succesfull"});
    }
  }

}