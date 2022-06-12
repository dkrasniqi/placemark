// @ts-nocheck
import axios from "axios";
import { user } from "../stores.js";
import jwt_decode from "jwt-decode";

export class PlacemarkService  {
  baseUrl = "";

  constructor(baseUrl){
    this.baseUrl = baseUrl;
    const placemarkCredentials = localStorage.placemark;
    if (placemarkCredentials) {
      const savedUser = JSON.parse(placemarkCredentials)
      user.set({
        email: savedUser.email,
        id: savedUser.id,
        token: savedUser.token,
      });
      axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if (response.data.success) {

        const token = response.data.token;
        const decoded = jwt_decode(token);
        const userId = decoded.id;
        
        user.set({
          email: email,
          id: userId,
          token: response.data.token,
        });

        localStorage.placemark = JSON.stringify({email:email, token:response.data.token, id:userId});
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
 
  async signup(firstName, lastName, email, password) {
    try {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(`${this.baseUrl}/api/users`, data);
      return true;
    } catch (error){
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      id: "",
      token: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("placemark");
  }

  async addPlacemark(name, description, lat, long, categorie, userid) {
    const data = {
      name : name,
      description: description,
      lat: lat,
      long: long,
      categorie: categorie,
      userid: userid,
    }
    try{
      const response = await axios.post(`${this.baseUrl}/api/placemarks`, data);
      return true;
    }catch(error){
      return false;
    }
  }

  async getUserPlacemarks(id){
    const response =  await axios.get(`${this.baseUrl}/api/placemarks/user/${id}`);
    
    return response.data;

  }

  async getPlacemarkById(id){
    const response = await axios.get(`${this.baseUrl}/api/placemarks/${id}`);
    return response.data;
  }

  async changeName(id, newFirstName, newLastName){
    const data = {
      id : id,
      newFirstName: newFirstName,
      newLastName: newLastName,
    }
    const response = await axios.post(`${this.baseUrl}/api/users/changeName`, data);
    if(response.data){
      return true;
    }
    return false;
  }

  async changeMail(id, oldMail, newMail, newMailConfirm){
    const data = {
      id : id,
      oldMail: oldMail,
      newMail: newMail,
      newMailConfirm: newMailConfirm,
    }
    const response = await axios.post(`${this.baseUrl}/api/users/changeMail`, data);
    if(response.data){
      return true;
    }
    return false;
  }

  async changePass(id, oldPass, newPass, newPassConfirm){
  const data = {
    id : id,
    oldPass: oldPass,
    newPass: newPass,
    newPassConfirm: newPassConfirm,

  }
  const response = await axios.post(`${this.baseUrl}/api/users/changePass`, data);
  if(response.data){
    return true;
  }
  return false;

}

async deletePlacemark(id){
  try{
  const response = await axios.delete(`${this.baseUrl}/api/placemarks/${id}`);
  return true;
  }catch(error){
    return false;
  }
}
}
