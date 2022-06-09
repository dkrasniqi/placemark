import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import * as mongooseSeeder from "mais-mongoose-seeder";
import { seedData } from "./seed.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo() {
  const result = dotenv.config();

  if(result.error){
    console.log(result.error.message);
  }

  Mongoose.connect(process.env.db);
  const database = Mongoose.connection;

  database.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  database.on("disconnected", () => {
    console.log("database disconnected");
  });

  database.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });

  
}