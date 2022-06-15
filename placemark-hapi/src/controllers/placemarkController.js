import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placemarkId = request.params.id;
      const placemark = await db.placemarkStore.getPlacemarkById(placemarkId);

      const data = {
        user: loggedInUser,
        placemark: placemark,
        title: placemark.name,
      };
      return h.view("placemark", data);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        console.log(file);
        console.log(typeof file);
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
