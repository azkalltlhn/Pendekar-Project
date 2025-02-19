import { A } from '@solidjs/router';
import User from '../../assets/img/user.svg';
// import user from 'src/assets/img/user.svg'
import { createEffect, createSignal } from 'solid-js';
import { getProfile } from '@/functions/Profile';
import IndonesianDate from '@/functions/IndonesianDate';
import { ENDPOINT_URL } from '@/config/config';

export default function ProfilePage() {
  const [profile, setProfile] = createSignal<any>({});
  const [semester, setSemester] = createSignal<any>('')

  createEffect(async () => {
    const user = await getProfile();
    setSemester(user[0].semester)
    setProfile(user[0]);
  });

  return (
    <div class='main-content'>
      <div class='w-full bg-[#F4F7FE]'>
        <div class='h-min-content flex items-end justify-between pl-8 text-xl font-semibold text-blue-900'>
          <p>Data Pribadi</p>
        </div>

        <div class='w-19/20 mx-8 mt-2  flex flex-col rounded-xl bg-[#FFFFFF] p-6 px-24 py-12 shadow-md'>
          <img id='preview'  class='rounded-full mb-12 mt-[25px] h-[200px] w-[200px] self-center' src={profile().foto_profile ? `${ENDPOINT_URL}/images/${profile().foto_profile}` :  User} alt='User' />
         
          <table class='px-24 pt-7'>
            <tbody>
              <tr>
                <td class='profile-text py-1'>Nama Lengkap</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>{profile().nama}</td>
              </tr>
              <tr>
                <td class='profile-text  py-1'>Tanggal Lahir</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>
                  {IndonesianDate(profile().tanggal_lahir)}
                </td>
              </tr>
              <tr>
                <td class='profile-text  py-1'>Nomor Telepon</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>{profile().nomor_telepon}</td>
              </tr>
              <tr>
                <td class='profile-text py-1'>Email</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>{profile().email}</td>
              </tr>
              <tr>
                <td class='profile-text py-1'>Username</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>{profile().username}</td>
              </tr>
              {/* <tr>
                <td class='profile-text w-[270px] py-1'>Password</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>{profile().password}</td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div class='h-min-content flex items-end justify-between pl-8 pt-8 text-xl font-semibold text-blue-900'>
          <p>Data Perguruan Tinggi</p>
        </div>
        <div class='w-19/20 mx-8 mt-2 flex flex-col rounded-xl bg-[#FFFFFF] p-6 px-24 py-12 shadow-md'>
          <table class=''>
            <tbody class=''>
              <tr>
                <td class='profile-text w-[270px] py-1'>Semester</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>{semester().replace(/(\w)(\d)/, '$1 $2')}</td>
              </tr>
              <tr>
                <td class='profile-text w-[270px] py-1'>Pendidikan Terakhir</td>
                <td class='text-black'>:</td>
                <td class='data-pribadi-nama'>
                  {profile().pendidikan_terakhir}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class='flex items-center justify-center'>
            <A class='ubah mt-6 text-center rounded-xl p-2' href='/profile/edit'>
              Ubah
            </A>
        </div>
      </div>
    </div>
  );
}
