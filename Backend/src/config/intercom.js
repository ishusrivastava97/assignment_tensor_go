
const axios = require("axios");

const intercomClient = axios.create({
  baseURL: "https://api.intercom.io",
  headers: {
    Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
   
    "Intercom-Version": "2.11",
  },
});

module.exports = intercomClient;
