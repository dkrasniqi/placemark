import { UserCredentialsSpec, UserSpec } from "../models/joi.js";
import { db } from "../models/db.js";

export const userController = {
  index: {
    auth: false,
    handler: function(request, h){
      return h.view("welcome", {title: "Welcome to the test page of placemark"});
    },
  },

  loginView: {
    auth: false,
    handler: function(request, h){
      return h.view("login", {title: "Please log into your account"});
    },
  },

  signupView: {
    auth: false,
    handler: function(request, h){
      return h.view("signup", {title: "Please create an account"});
    },
  },

  signup: {
    auth: false,
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
    auth: false,
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
      const userData = await db.userStore.getUserByEmail(user.email);
      if(!userData|| user.password !== userData.password){
        // Add error page
        return h.view("login", {title: "Logging in error"}).takeover().code(400);
      }
      request.cookieAuth.set({ id: userData._id });
      return h.redirect("/dashboard");
    }
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },

}