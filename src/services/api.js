import axios from "axios";

export const api = axios.create({
  baseURL: "https://backend-completo.vercel.app/app",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// OBS: Precisei criar uma outra variável de api com um token fixo, pois o GET de produtos só aceita chamadas com token,
// porém usuários não precisam fazer login, logo, não tem token
export const apiMock = axios.create({
  baseURL: "https://backend-completo.vercel.app/app",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiMDEwNjIzMDA4IiwiaWF0IjoxNzQ2NzYwNzIzLCJleHAiOjE3NDY4NDcxMjN9.1DpskQKL7mKFhbZMk8JoPY9ETK3q8bckNLmzl47Irh4",
  },
});

export const myUser = '010623008';