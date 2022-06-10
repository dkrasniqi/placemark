/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`http://localhost:3000/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`http://localhost:3000/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`http://localhost:3000/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`http://localhost:3000/api/users`);
    return res.data;
  },

  async createPlacemark(playlist) {
    const res = await axios.post(`http://localhost:3000/api/placemarks`, playlist);
    return res.data;
  },

  async deleteAllPlacemarks() {
    const response = await axios.delete(`http://localhost:3000/api/placemarks`);
    return response.data;
  },

  async deletePlacemark(id) {
    const response = await axios.delete(`http://localhost:3000/api/placemarks/${id}`);
    return response;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`http://localhost:3000/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`http://localhost:3000/api/placemarks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`http://localhost:3000/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};