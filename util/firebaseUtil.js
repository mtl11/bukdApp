import axios from "axios";

export default axios.create({
    baseURL: "https://bukd-app-default-rtdb.firebaseio.com/"
})