import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      if(placemark){
        return placemark;
      }
    }
    return null;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const placemarkObject = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObject._id);
  },

  async getUserPlacemarks(id) {
    const placemarks = await Placemark.find({ userid: id }).lean();
    return placemarks;
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(updatedPlacemark) {
    const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
    placemark.title = updatedPlacemark.title;
    placemark.img = updatedPlacemark.img;
    await placemark.save();
  },
};