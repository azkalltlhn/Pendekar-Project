import { ENDPOINT_URL } from '@/config/config';
import axios from 'axios';

axios.defaults.baseURL = ENDPOINT_URL;

const getAllEvents = async () => {
  const response = await axios.get(`${ENDPOINT_URL}/event/query/all`, {
    withCredentials: true,
  });
  return response.data;
};

const getEventByJenis = async (category: any) => {
  const response = await axios.get(
    `${ENDPOINT_URL}/event/category/${category}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

const getEventById = async (id: any) => {
  const response = await axios.get(`${ENDPOINT_URL}/event/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export { getAllEvents, getEventByJenis, getEventById };
