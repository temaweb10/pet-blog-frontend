import axios from "axios";

const istance = axios.create({
  baseURL: "http://localhost:4444",
});

export default istance;
