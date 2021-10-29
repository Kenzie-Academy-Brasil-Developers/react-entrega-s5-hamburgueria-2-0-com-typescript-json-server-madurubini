import axios from "axios";

const api = axios.create({
  baseURL: "https://japan-hot-food.herokuapp.com/",
});

export default api;
