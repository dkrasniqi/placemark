import * as dotenv from "dotenv";
import Mongoose from "mongoose";

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
  });

  
}