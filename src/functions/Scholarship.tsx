import { ENDPOINT_URL } from '@/config/config';
import axios from 'axios';

axios.defaults.baseURL = ENDPOINT_URL;

const getAllBeasiswa = async () => {
  const response = await axios.get(`${ENDPOINT_URL}/beasiswa/query/all`, {
    withCredentials: true,
  });
  return response.data;
};

const getBeasiswaById = async (id: any) => {
  const response = await axios.get(`${ENDPOINT_URL}/beasiswa/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export { getAllBeasiswa, getBeasiswaById };
