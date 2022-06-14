// @ts-nocheck
import * as cloudinary from "cloudinary";


export class ImageService {
  constructor(){
    const credentials = {
      cloud_name: dms9pf9fp,
      api_key: 923349646937547,
      api_secret: I9MxC6131DzdPmWsXqtB0R4eTYg,
    };
    cloudinary.config(credentials);
  }

  async getAllImages(){
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  }
  async uploadImage(imagefile){
    const response = await cloudinary.v2.uploader.upload(imagefile);
    return response.url;
  }

  async deleteImage(img){
    await cloudinary.v2.uploader.destroy(img, {});
  }

}


