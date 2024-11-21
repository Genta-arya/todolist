import axios from "axios";

const base_url = "https://todolist-servers.vercel.app/api/v1";

const AxiosConfig = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default AxiosConfig;
