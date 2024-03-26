import axios from 'axios';
// should be in env file
// const baseURL = 'http://192.168.1.9:5001';
// const baseURL = 'https://test-en75.onrender.com';
const baseURL =
  'https://script.google.com/macros/s/AKfycbwZaiLB067Lc9JSivlZk5-CH0_XVDedf5arYkQV-G4UMKVE-XyeoWA-KGM2T9Ywboo_/exec';
// Add Timeout to avoid inifinity processing
export const appAxios = async (
  method: string,
  endpoint: string = '',
  data: any = null,
) => {
  const url = String(endpoint).includes('?')
    ? `${baseURL}${endpoint}`
    : `${baseURL}`;
  try {
    const response = await axios({method, url, data});
    return response.data;
  } catch (error) {
    console.log(error, 'error');
    return error;
  }
};
