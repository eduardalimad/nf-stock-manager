import axios from "axios";

const baseUrl = axios.create({
    baseURL: "http://192.168.3.65:8000/",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
});

export {baseUrl};
