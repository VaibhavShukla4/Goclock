import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// console.log(BASE_URL);
export const getMessage = async (messages) => {
  return await axios.get(`${BASE_URL}/messages`);
};
export const getResponse = async (messages) => {
  return await axios.get(`${BASE_URL}/response`);
};
export const postMessage = async (data) => {
  return await axios.post(`${BASE_URL}/manufacturer/send`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const postResponse = async (response) => {
  return await axios.post(`${BASE_URL}/transporter/response`, response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const registerUser = async (response) => {
  return await axios.post(`${BASE_URL}/signup`, response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const loginUser = async (response) => {
  return await axios.post(`${BASE_URL}/loginUser`, response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
