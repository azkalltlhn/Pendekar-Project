import { ENDPOINT_URL } from '@/config/config';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = ENDPOINT_URL;

const tampilProfile = async () => {
  const userData = JSON.parse(localStorage.getItem('userData')!);
  const response = await axios.get(`${ENDPOINT_URL}/account/${userData.id}`, {
    withCredentials: true,
  });

  return response.data;
};

// Memanggil fungsi tampilProfile dan menampilkan hasilnya ke dalam console log
tampilProfile()
  .then(profileData => {
    console.log('Profile Data:', profileData);
  })
  .catch(error => {
    console.error('Error fetching profile data:', error);
  });

// const tampilProfile = async () => {
//     const userData = JSON.parse(localStorage.getItem('userData')!);
//     const response = await axios.get(`${ENDPOINT_URL}/account/${userData.id}`, {
//       withCredentials: true,
//     });

//     return response.data;
//   };

const updateProfile = async () => {
  const userData = JSON.parse(localStorage.getItem('userData')!);

  try {
    const response: AxiosResponse<any> = await axios.put(
      `/account/${userData.id}`,
      //   newProfileData,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      // Data berhasil diubah, tampilkan alert atau notifikasi
      alert('Data berhasil diubah');
      // Jika menggunakan notifikasi, gunakan kode berikut
      // Notification.requestPermission().then((permission) => {
      //   if (permission === 'granted') {
      //     new Notification('Data berhasil diubah');
      //   }
      // });

      // Pastikan props.OnClose() sudah didefinisikan sebelumnya
      // props.OnClose();
    } else {
      // Gagal mengubah data, tampilkan pesan kesalahan dari respons
      const errorMessage = response.data || 'Terjadi kesalahan tanpa pesan';
      alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
      console.error('Gagal mengubah data:', errorMessage);
    }
  } catch (error) {
    // Terjadi kesalahan jaringan atau kesalahan lainnya, tampilkan alert dengan pesan kesalahan
    alert('Terjadi kesalahan. Silakan coba lagi.');
    console.error('Terjadi kesalahan:', error);
  }
};

export { updateProfile };
