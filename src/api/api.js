import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// console.log(BASE_URL);
export const getPost = async (messages) => {
  return await axios.get(`${BASE_URL}/post`);
};

export const postUpdate = async (id, data) => {
  console.log(id, data);
  return await axios.put(`${BASE_URL}/posts/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sendPost = async (response) => {
  return await axios.post(`${BASE_URL}/send-post`, response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postDelete = async (id) => {
  console.log(id);
  return await axios.delete(`${BASE_URL}/posts-delete/${id}`, {
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
