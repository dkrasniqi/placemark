import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placemarkApi = {
  find: {
    auth: false,
    handler: async function(request, h){
      try{
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  findOne:{
    auth: false,
    handler: async function(request, h){
      try{
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if(!placemark){
          return Boom.notFound("No placemark with this id");
        }
        return placemark;

      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  create:{
    auth: false,
    handler: async function(request, h){
      try{
        const placemark = await db.placemarkStore.addPlacemark(request.payload);
        if(!placemark){
          return Boom.badImplementation("Error while creating placemark");
        }
        return h.response(placemark).code(201);
      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    }
  },

  deleteAll:{
    auth: false,
    handler: async function(request, h){
      try{
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    },
  },

  deleteOne:{
    auth: false,
    handler: async function(request, h){
      try{
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if(!placemark){
          return Boom.notFound("No placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);

      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    },
  },
};