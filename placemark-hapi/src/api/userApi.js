/* eslint-disable prefer-destructuring */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, UserCredentialsSpec, UserArray, IdSpec, JwtAuth, changeNameSpecApi, changePassSpecApi} from "../models/joi.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const users = await db.userStore.getAllUsers();
        console.log("users")
        return users;
      }catch(err){
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns all users",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const user = await db.userStore.getUserById(request.params.id);
        if(!user){
          return Boom.notFound("No existing user with this id");
        }
        return user;
      }catch(err){
        return Boom.serverUnavailable("No existing user with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function(request, h){
      try{
        const user = await db.userStore.addUser(request.payload);
        if(!user){
          return Boom.badImplementation("Error while creating user");
        }
        return h.response(user).code(201);
      }catch(err){
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a user",
    notes: "Returns the new  created user",
    validate: { payload: UserSpec , failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        await db.userStore.deleteAll();
        return h.response().code(204);
      }catch{
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users",
    notes: "Deletes all users from database",
  },

  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        } 
        if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        return h.response({ success: true, token: token }).code(201);
      
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate a user",
    notes: "Returns JWT-Token if user exists",
    validate: { payload: UserCredentialsSpec , failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError },
  },

  changeName:{
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const newFirst = request.payload.newFirstName;
        const newLast = request.payload.newLastName;
        const userId = request.payload.id;
        console.log(request.payload);
        const newName = await db.userStore.changeUserName(userId, newFirst, newLast);  
        return h.response(newName).code(201);
      }catch{
        return Boom.serverUnavailable("Error while changing Name");
      }
    },
    tags: ["api"],
    description: "Change name of user",
    notes: "Returns the updated user",
    validate: { payload: changeNameSpecApi , failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  changeUserMail:{
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const oldMail = request.payload.oldMail;
        const newMail = request.payload.newMail;
        const newMailConfirm = request.payload.newMailConfirm;
        const userId = request.payload.id;
        const user = await db.userStore.getUserById(userId);

        if(user.email !== oldMail){
          return Boom.badImplementation("Error while changing email");
        }
        if(newMail !== newMailConfirm){
          return Boom.badImplementation("Error while changing email");
        }

        const updatedMail= await db.userStore.changeUserMail(userId, newMail);
        return h.response(updatedMail).code(201);

      }catch{
        return Boom.serverUnavailable("Error while changing Mail");
      }
    },
    tags: ["api"],
    description: "Change mail of",
    notes: "Returns the udpated user",
    validate: { payload: UserSpec , failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  changeUserPass:{
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const oldPass = request.payload.oldPass;
        const newPass = request.payload.newPass;
        const newPassConfirm = request.payload.newPassConfirm;
        const userId = request.payload.id;
        const user = await db.userStore.getUserById(userId);

        if(oldPass !== user.password){
          return Boom.badImplementation("Error while changing password");
        }
        if(newPass!== newPassConfirm){
          return Boom.badImplementation("Error while changing password");
        }

        const updatedPass=  await db.userStore.changeUserPass(userId, newPass);
        return h.response(updatedPass).code(201);

      }catch{
        return Boom.serverUnavailable("Error while changing Password");
      }
    },
    tags: ["api"],
    description: "Change password of user",
    notes: "Returns the updated  created user",
    validate: { payload: changePassSpecApi , failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  }
};