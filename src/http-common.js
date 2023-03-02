import axios from "axios";

export default axios.create({
  baseURL: "https://stoplight.io/mocks/diginext-interview/website-interviews/144194864",
  headers: {
    "Content-type": "application/json"
  }
});