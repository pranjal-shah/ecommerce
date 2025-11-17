import axios from "axios";

export const register = async (inputValue) => {
  try {
    console.log(`in register--start`);
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    console.log(`in register--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in register--error`);
    return error.response.data;
  }
};

export const login = async (inputValue) => {
  try {
    console.log(`in login--start`);
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/auth/login`,
      {
        ...inputValue,
      },
      { withCredentials: true }
    );
    console.log(`in login--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in login--error`);

    return error.response.data;
  }
};

export const logout = async () => {
  try {
    console.log(`in logout--start`);
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/auth/logout`,
      {},
      { withCredentials: true }
    );
    console.log(`in logout--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in logout--error`);
    return error.response.data;
  }
};
