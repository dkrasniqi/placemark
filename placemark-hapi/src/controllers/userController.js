/* eslint-disable prefer-destructuring */
import { UserCredentialsSpec, UserSpec, changeNameSpec, changeMailSpec, changePassSpec } from "../models/joi.js";
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

  logout: {
    handler: async function(request, h){
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  },

  settings:{
    handler: async function(request, h){
      return h.view("settings", {title: "Change your account details"});
    },
  },

  changeName:{
    validate: {
      payload: changeNameSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        // Add error page
        return h.view("settings", { title: "Error while changing Name"}).takeover().code(400);
      }
    },
    handler: async function(request, h){
        const newFirst = request.payload.newFirstName;
        const newLast = request.payload.newLastName;
        const userId = request.auth.credentials._id
        await db.userStore.changeUserName(userId, newFirst, newLast);   
        return h.view("settings", {title: "Changed name"});
    },
  },

  changeMail:{
    validate: {
      payload: changeMailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        // Add error page
        return h.view("settings", { title: "Error while changing Mail"}).takeover().code(400);
      }
    },
    handler:  async function(request, h){
      const oldMail = request.payload.oldMail;
      const newMail = request.payload.newMail;
      const newMailConfirm = request.payload.newMailConfirm;
      const user = await db.userStore.getUserById(request.auth.credentials._id);

      if(user.email !== oldMail){
        return h.view("settings", {title: "wrong email"}).takeover().code(400);
      }

      if(newMail !== newMailConfirm){
        return h.view("settings", {title: "new email is not exact"}).takeover().code(400);
      }
      await db.userStore.changeUserMail(user._id, newMail);
      return h.view("settings", {title: "Changed email"});

    },
  },

  changePass: {
    validate: {
      payload: changePassSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        // Add error page
        return h.view("settings", { title: "Error while changing Pass"}).takeover().code(400);
      }
    },
    handler: async function(request, h){
      const oldPass = request.payload.oldPass;
      const newPass = request.payload.newPass;
      const newPassConfirm = request.payload.newPassConfirm;
      const user = await db.userStore.getUserById(request.auth.credentials._id);

      if(oldPass !== user.password){
        return h.view("settings", {title: "Your current password is  wrong"});
      }
      if(newPass !== newPassConfirm){
        return h.view("settings",  {title: "Passwords are not same"});
      }
      await db.userStore.changeUserPass(user._id, newPass);
      return h.view("settings", {title: "Changed Password"});

    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },

}