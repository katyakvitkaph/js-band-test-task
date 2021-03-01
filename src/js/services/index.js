
import axios from 'axios';
const baseURL = 'http://158.101.166.74:8080/api/data/kate_kiriukhina';


export default class ServiceAPI {
  constructor() {
    this.server = baseURL;
    this.axios= axios;
  }

  async initUser(params) {
    try {
      let result = await this.axios.post(`${this.server}/users`, params);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  
  async getAllUsers() {
    try {
      let result = await this.axios.get(`${this.server}/users`);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addEvent(params) {
    try {
      let result = await this.axios.post(`${this.server}/events`, params);
      console.log('ADDED');
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllEvents() {
    try {
      let result = await this.axios.get(`${this.server}/events`);
      console.log('!RESULT' , result.data);
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getEventByID(id) {
    try {
      let result = await this.axios.get(`${this.server}/events/${id}`);

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteEvent(id) {
    try {
      let result = await this.axios.delete(`${this.server}/events/${id}`);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }



}