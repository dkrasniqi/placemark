import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  
  init() {

    this.userStore = userMongoStore;
    this.placemarkStore = placemarkMongoStore;

    connectMongo();
      
  }
};