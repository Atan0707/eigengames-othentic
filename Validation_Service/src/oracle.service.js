require('dotenv').config();
const axios = require("axios");


async function getPrice(pair) {
  var res = null;
    try {
        const result = await axios.get(`https://lp-tracker-f5tfjvgnl-atan0707s-projects.vercel.app/api/pools`);
        res = result.data;

    } catch (err) {
      result = await axios.get(`https://lp-tracker-f5tfjvgnl-atan0707s-projects.vercel.app/api/pools`);
      res = result.data;
    }
    return res;
  }
  
  module.exports = {
    getPrice,
  }