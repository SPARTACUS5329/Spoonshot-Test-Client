import Axios from "axios";

const baseURL: string = import.meta.env.PROD ? "" : "http://127.0.0.1:8000/books/";

const axios = Axios.create({
	baseURL,
	withCredentials: true,
});

export default axios;
