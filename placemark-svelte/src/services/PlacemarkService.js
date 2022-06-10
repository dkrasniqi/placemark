/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
import axios from "axios";

export class PlacemarkService  {
  baseUrl = "";

  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }

  async login(email, password){
    const data = {
      email : email,
      password: password,
    };
    
    try{
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, data);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      if(response.data.success){
        return true;
      }
      return false;
      
    }catch(error){
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
    axios.defaults.headers.common["Authorization"] = "";
  }
}
