import axios from "axios";

const baseurl = process.env.REACT_APP_API_KEY
export const axiosApi = axios.create({
    baseURL : baseurl,
})