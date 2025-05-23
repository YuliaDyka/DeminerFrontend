import axios from "axios";

export const ItemsBaseURL = "http://127.0.0.1:5000";

export const login_request = async ({ email, password }, callback) => {
  axios
    .post(`${ItemsBaseURL}/user/login`, {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response);
      callback(response.data);
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        alert(error.response.data);
      } else {
        console.log(error);
      }
    });
};

export const save_session_request = async (commands) => {
  try {
    const response = await axios.post(`${ItemsBaseURL}/sessions/create`, {
      commands: commands,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get_all_sessions = async () => {
  try {
    const response = await axios.get(`${ItemsBaseURL}/sessions`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
