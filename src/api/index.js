import axios from "axios";
const axiosMain = axios.create({
  baseURL: "https://yusewallet.donative.in/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosMain;