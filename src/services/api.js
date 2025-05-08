import axios from "axios";

export const api = axios.create({
    baseURL: "https://backend-completo.vercel.app/app"
});