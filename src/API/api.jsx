import axios from "axios";

export const ItemsBaseURL = "http://yulia-rpi5.ddns.net:5606";

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

export const save_session_request = async (nameSession, commands) => {
  try {
    const response = await axios.post(`${ItemsBaseURL}/sessions/create`, {
      nameSession: nameSession,
      commands: commands,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const save_commands_request = async (command) => {
  try {
    const response = await axios.post(`${ItemsBaseURL}/commands/create`, {
      command: command,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const update_commands_request = async (id, command) => {
  try {
    const response = await axios.put(`${ItemsBaseURL}/commands/${id}`, {
      command: command,
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

export const getSession_by_id = async (session_id) => {
  try {
    const response = await axios.post(`${ItemsBaseURL}/sessions/getById`, {
      id: session_id,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const delete_request = async (id) => {
  try {
    const response = await axios.delete(`${ItemsBaseURL}/commands/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const setActive_request = async (id) => {
  try {
    const response = await axios.post(`${ItemsBaseURL}/commands/set-active`, {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const activeCommand_request = async (activeCommand) => {
  try {
    const response = await axios.post(
      `${ItemsBaseURL}/commands/active-command`,
      {
        activeCommand: activeCommand,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getActiveCmdIndex = async () => {
  try {
    const response = await axios.post(
      `${ItemsBaseURL}/sessions/get-active-cmd`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const activeSessionId_request = async (id) => {
  try {
    const response = await axios.post(
      `${ItemsBaseURL}/sessions/active-session-id`,
      {
        id: id,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const checkConnection = async () => {
  try {
    const response = await axios.post(
      `${ItemsBaseURL}/sessions/check-connection`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const cameraPosition = async (action, dir) => {
  try {
    const response = await axios.post(
      `${ItemsBaseURL}/sessions/camera-position`,
      {
        action: action,
        dir: dir
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
