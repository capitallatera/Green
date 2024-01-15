import axios from 'axios';
// should be in env file
const baseURL = 'http://192.168.1.9:5001';
// Add Timeout to avoid inifinity processing
export const appAxios = async (
  method: string,
  endpoint: string,
  data: any = null,
) => {
  const url = `${baseURL}${endpoint}`;
  try {
    const response = await axios({method, url, data});
    return response.data;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
};
