/* eslint-disable prefer-destructuring */
import { UserCredentialsSpec, UserSpec, changeNameSpec, changeMailSpec, changePassSpec } from "../models/joi.js";
import { db } from "../models/db.js";

export const userController = {
  index: {
    auth: false,
    handler: function (request, h) {
      const user = request.auth.credentials;
      const data = {
        title: "Welcome to the dashboard of placemark",
        user: user,
      };
      return h.view("welcome", data);
    },
  },

  loginView: {
    auth: false,
    handler: function (request, h) {
      return h.view("login", { title: "Please log into your account" });
    },
  },

  signupView: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup", { title: "Please create an account" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const user = request.payload;
      // Check for existing user
      const emailIsUsed = await db.userStore.checkMail(user.email);
      if (emailIsUsed) {
        const error = [
          {
            message: "E-Mail already taken",
          },
        ];
        return h.view("signup", { title: "Sign up error", errors: error });
      }
      await db.userStore.addUser(user);
      return h.redirect("/login");
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login", { title: "Logging in error", errors: error.details }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const user = request.payload;
      const userData = await db.userStore.getUserByEmail(user.email);
      if (!userData || user.password !== userData.password) {
        const error = [
          {
            message: "E-Mail or password is incorrect",
          },
        ];
        return h.view("login", { title: "Logging in error", errors: error }).takeover().code(400);
      }
      request.cookieAuth.set({ id: userData._id });
      return h.redirect("/dashboard");
    },
  },

  logout: {
    handler: async function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  settings: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const data = {
        title: "Change your account details",
        user: user,
      };
      return h.view("settings", data);
    },
  },

  changeName: {
    validate: {
      payload: changeNameSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        return h.view("settings", { title: "Error while changing Name", errors: error.details, user: user }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const newFirst = request.payload.newFirstName;
      const newLast = request.payload.newLastName;
      const user = request.auth.credentials;
      await db.userStore.changeUserName(user._id, newFirst, newLast);
      const success = [
        {
          message: "Successfully changed name",
        },
      ];
      return h.view("settings", { title: "Changed name", success: success, user: user });
    },
  },

  changeMail: {
    validate: {
      payload: changeMailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        return h.view("settings", { title: "Error while changing Mail", errors: error.details, user: loggedInUser }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const oldMail = request.payload.oldMail;
      const newMail = request.payload.newMail;
      const newMailConfirm = request.payload.newMailConfirm;
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);

      if (user.email !== oldMail) {
        const error = [
          {
            message: "Old E-Mail is not correct",
          },
        ];
        return h.view("settings", { title: "Error", errors: error, user: loggedInUser }).takeover().code(400);
      }

      if (newMail !== newMailConfirm) {
        const error = [
          {
            message: "New E-Mails do not match",
          },
        ];
        return h.view("settings", { title: "Error", errors: error, user: loggedInUser }).takeover().code(400);
      }
      await db.userStore.changeUserMail(user._id, newMail);
      const success = [
        {
          message: "Successfully changed E-Mail",
        },
      ];
      return h.view("settings", { title: "Changed email", success: success, user: loggedInUser });
    },
  },

  changePass: {
    validate: {
      payload: changePassSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        return h.view("settings", { title: "Error while changing Password", errors: error.details, user: user }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const oldPass = request.payload.oldPass;
      const newPass = request.payload.newPass;
      const newPassConfirm = request.payload.newPassConfirm;
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);

      if (oldPass !== user.password) {
        const error = [
          {
            message: "Old password is wrong",
          },
        ];
        return h.view("settings", { title: "Error", errors: error, user: loggedInUser });
      }
      if (newPass !== newPassConfirm) {
        const error = [
          {
            message: "New passwords do not match",
          },
        ];

        return h.view("settings", { title: "Error", errors: error, user: loggedInUser });
      }
      await db.userStore.changeUserPass(user._id, newPass);
      const success = [
        {
          message: "Successfully changed Password",
        },
      ];

      return h.view("settings", { title: "Changed Password", success: success, user: loggedInUser });
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
