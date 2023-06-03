import axios from "axios";

export const getMessage = async (messages) => {
  return await axios.get(`http://localhost:8000/messages`);
};
// export default getMessage;
export const postMessage = async (data) => {
  return await axios.post("http://localhost:8000/manufacturer/send", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const postResponse = async (response) => {
  return await axios.post(
    "http://localhost:8000/transporter/response",
    response,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const registerUser = async (response) => {
  return await axios.post("http://localhost:8000/signup", response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const loginUser = async (response) => {
  return await axios.post("http://localhost:8000/loginUser", response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
