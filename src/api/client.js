const { default: axios } = require("axios");

export default axios.create({
  baseURL: `https://am-blog-be.herokuapp.com/`,
});
