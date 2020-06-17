import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-9f72b.firebaseio.com/",
});

export default instance;
