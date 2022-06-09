import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArray, IdSpec } from "../models/joi.js";
import { validationError } from "./logger.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        console.log(placemarks)
        return placemarks;

      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Get all placemarks",
    notes: "Return a array with all placemarks",
    response: { schema: PlacemarkArray, failAction: validationError },
  },

  findOne:{
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Get a specific placemark",
    notes: "Return placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  create:{
    auth: {
      strategy: "jwt",
    },
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
    },
    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns created placemark",
    validate: { payload: PlacemarkSpec, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteAll:{
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      }catch(err){
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Deletes all placemarks",
    notes: "Deletes all placemarks from database",
  },


  deleteOne:{
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Deletes a specific placemark",
    notes: "Returns user",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};