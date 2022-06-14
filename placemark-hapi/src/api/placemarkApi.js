import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PlacemarkSpec, PlacemarkSpecPlus, PlacemarkArray, IdSpec } from "../models/joi.js";
import { validationError } from "./logger.js";
import { decodeToken } from "./jwt-utils.js";

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
          return Boom.notFound("No existing placemark with this id");
        }
        return placemark;

      }catch(err){
        return Boom.serverUnavailable("No existing placemark with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific placemark",
    notes: "Return placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  findPlacemarksByUser:{
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        const placemarks = await db.placemarkStore.getUserPlacemarks(request.params.id);
        console.log(placemarks);
        if(!placemarks){
          return Boom.notFound("No existing placemark with this userid");
        }
        return placemarks;

      }catch(err){
        return Boom.serverUnavailable("No existing placemarks with this userid");
      }
    },
    tags: ["api"],
    description: "Get placemarks of a user",
    notes: "Returns placemarks",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkArray, failAction: validationError },

  },


  create:{
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h){
      try{
        console.log(request.payload)
        const placemarkObj = await db.placemarkStore.addPlacemark(request.payload);
        if(!placemarkObj){
          return Boom.badImplementation("Error while creating placemark");
        }
        return h.response(placemarkObj).code(201);
      }catch(err){
        console.log(err);
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
          return Boom.notFound("No existing placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);

      }catch(err){
        return Boom.serverUnavailable("No existing placemark with this id");
      }
    },
    tags: ["api"],
    description: "Deletes a specific placemark",
    notes: "Returns user",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updatePlacemark(placemark);
        }
        return url;
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Error while uploading picture");
      }
    
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    },
    tags: ["api"],
    description: "Add photo to placemark",
    notes: "Returns Url of photo",
  }
};