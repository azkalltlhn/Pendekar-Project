import { ENDPOINT_URL } from '@/config/config';
import axios from 'axios';

axios.defaults.baseURL = ENDPOINT_URL;

const getProfile = async () => {
  const userData = JSON.parse(localStorage.getItem('userData')!);
  const response = await axios.get(`${ENDPOINT_URL}/account/${userData.id}`, {
    withCredentials: true,
  });

  return response.data;
};

const updateProfile = async(data:any) => {
  const userData = JSON.parse(localStorage.getItem('userData')!);
  const formData = new FormData()
  formData.append('id', userData.id)
  formData.append('nama', data.nama)
  formData.append('tanggal_lahir', `${data.tanggalLahir}T00:00:00`)
  formData.append('nomor_telepon', data.phone)
  formData.append('email', data.email)
  formData.append('pendidikan_terakhir', data.pTerakhir)
  formData.append('semester', data.semester)
  formData.append('username', data.username)
  formData.append('password', data.password)
  if(data.foto_profile){
    formData.append('foto_profile', data.foto_profile)
  }
  const response = await axios.put(`${ENDPOINT_URL}/account/update`, formData,
    
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    }
  )

  return response.data
}

export { getProfile, updateProfile };
