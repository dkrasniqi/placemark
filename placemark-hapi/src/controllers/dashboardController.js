import { UserCredentialsSpec, UserSpec, PlacemarkSpec } from "../models/joi.js";
import { db } from "../models/db.js";

export const dashboardController = {
  
  index: {
    handler: async function (request, h) {
      const user = request.auth.credentials;
      const placemarks = await db.placemarkStore.getUserPlacemarks(user.id);
      const data = {
        title: "Your Placemarks",
        placemarks: placemarks,
      }

      return h.view("dashboard", data );
    },
  },

  addPlacemark:{
    validate: {
      payload: PlacemarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        // Add error page
        return h.view("welcome", { title: "Placemark error"}).takeover().code(400);
      }},
    handler: async function (request, h){
      const user = request.auth.credentials;
      const placemark = request.payload;
      await db.placemarkStore.addPlacemark(placemark);
      return h.redirect("/dashboard");


    }
  }



}