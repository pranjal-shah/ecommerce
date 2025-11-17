import axios from "axios";

export const getAllUsers = async () => {
  try {
    console.log(`in getAllUsers--start`);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/user`,
      { withCredentials: true }
    );
    console.log(`in getAllUsers--end: ${data}`);

    return data;
  } catch (error) {
    console.log(`in getAllUsers--error`);
    return error.response.data;
  }
};