import { ENDPOINT_URL } from '@/config/config';
import axios from 'axios';

axios.defaults.baseURL = ENDPOINT_URL;

const getAllJobs = async() => {
    const response = await axios.get(`${ENDPOINT_URL}/lowongankerja/query/all`, {
        withCredentials: true,
    });
    return response.data;
}

const getJobById = async (id: any) => {
    const response = await axios.get(`${ENDPOINT_URL}/lowongankerja/${id}`, {
      withCredentials: true,
    });
    return response.data;
  };

export { getAllJobs, getJobById }