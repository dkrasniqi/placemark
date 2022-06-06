import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, UserCredentialsSpec, UserArray, IdSpec} from "../models/joi.js";
import { validationError } from "./logger.js";

export const userApi = {
  find: {
    auth: false,
    handler: async function(request, h){
      try{
        const users = await db.userStore.getAllUsers();
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
    auth: false,
    handler: async function(request, h){
      try{
        const user = await db.userStore.getUserById(request.params.id);
        if(!user){
          return Boom.notFound("No existing user with this id");
        }
        return user;
      }catch(err){
        return Boom.serverUnavailable("Database Error");
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
    auth: false,
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

};