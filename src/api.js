const axios = require("axios");

const apiUrl = "http://localhost:3000";
const apiToken = "Bearer MRBW6ZDFEBBGC43FGMZA";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: apiToken
  }
});

module.exports = api;
