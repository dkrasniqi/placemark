import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
    }
  }
}