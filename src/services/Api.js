import axios from "axios";

const Api = axios.create({
    baseURL: 'http://10.48.13.5:3030'
});

export default Api;