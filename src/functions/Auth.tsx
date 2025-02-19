import { ENDPOINT_URL } from '@/config/config';
import axios from 'axios';

axios.defaults.baseURL = ENDPOINT_URL;

const registerAccount = async (userData: any) => {
  try {
    const response = await axios.post(
      `/account/register`,
      {
        nama: userData.nama,
        tanggal_lahir: `${userData.tanggalLahir}T00:00:00`,
        nomor_telepon: userData.phone,
        email: userData.email,
        pendidikan_terakhir: userData.pTerakhir,
        semester: userData.semester,
        username: userData.username,
        password: userData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    
    return response;

  }catch(err:any){
    console.log(err.response.status)
    if(err.response.status === 400){
      throw "Periksa kembali data anda."
    }else{
      throw err.response.data
    }
  }

};

const loginAccount = async (userData: any) => {
  try {
    const response = await axios.post(
      `/login`,
      {
        username: userData.username,
        password: userData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    if (response.data) {
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response;
    }
  }catch(err:any){
      throw err.response.data
  }
};

const logOut = async () => {
  const cookie = document.cookie;
  document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  localStorage.removeItem('userData');
};

export { registerAccount, loginAccount, logOut };
