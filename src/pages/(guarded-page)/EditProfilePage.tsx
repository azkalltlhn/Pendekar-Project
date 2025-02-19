import { createSignal, createEffect } from 'solid-js';
import './EditProfilePage.css';
import { A, useNavigate } from '@solidjs/router';
import { getProfile, updateProfile } from '@/functions/Profile';
import IndonesianDate from '@/functions/IndonesianDate';
import Photo from '@/assets/img/user.svg';
import PhotoEdit from '@/assets/img/edit-photo.svg';
import { ENDPOINT_URL } from '@/config/config';

export default function EditProfilePage() {
  const [profile, setProfile] = createSignal<any>({});
  const [tanggalLahir, setTanggalLahir] = createSignal<any>('');
  const [image, setImage] = createSignal<any>();
  const [imageUpload, setImageUpload] = createSignal<any>();
  const [nama, setNama] = createSignal('');
  const [phone, setPhone] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [pTerakhir, setPterakhir] = createSignal('');
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [semester, setSemester] = createSignal('');
  const [modalMsg, setModalMsg] = createSignal<any>({});
  const navigate = useNavigate();

  createEffect(async () => {
    const user = await getProfile();
    setTanggalLahir(user[0].tanggal_lahir.substring(0, 10));
    setNama(user[0].nama);
    setProfile(user[0]);
    setPhone(user[0].nomor_telepon);
    setEmail(user[0].email);
    setUsername(user[0].username);
    setPassword(user[0].password);
    setSemester(user[0].semester);
    setPterakhir(user[0].pendidikan_terakhir);
  });

  const handleProfileUpdate = async () => {
    const res = await updateProfile({
      nama: nama(),
      tanggalLahir: tanggalLahir(),
      phone: phone(),
      email: email(),
      pTerakhir: pTerakhir(),
      semester: semester(),
      username: username(),
      password: password(),
      foto_profile: imageUpload(),
    });
    setModalMsg({
      title: 'Ubah Profil',
      body: res
    });
    const modal = document.getElementById('auth_modal',) as HTMLDialogElement | null;
    modal && modal.showModal();
  };

  const handlePhoto = () => {
    document.getElementById('upload-photo')?.click();
  };
  const handleImageUpload = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageUpload(e.target.files[0]);
  };

  return (
    <>
    <div class='container'>
      <div class='main-content'>
        <div class='edit-profile'>
          <div class='group'>
            <div class=''>
              <button
                class='frame flex items-center justify-center text-xl text-white'
                onClick={() => handleProfileUpdate()}
              >
                Simpan
              </button>
            </div>
            <div class=''>
              <A
                href={'/profile'}
                class='div-wrapper-1 flex items-center justify-center text-xl'
              >
                Batal
              </A>
            </div>
            <div>
              <div class='overlap-group'>
                <img
                  id='preview'
                  class='ellipse rounded-full'
                  src={
                    image()
                      ? image()
                      : profile().foto_profile
                        ? `${ENDPOINT_URL}/images/${profile().foto_profile}`
                        : Photo
                  }
                  alt='User'
                />
                <img
                  class='img cursor-pointer'
                  onClick={() => {
                    handlePhoto();
                  }}
                  src={PhotoEdit}
                  alt='Group'
                />
                <input
                  id='upload-photo'
                  type='file'
                  class='hidden'
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <div class='div'>
            <div class='group-wrapper'>
              <div class='div-wrapper'>
                <div class='text-wrapper'>Nama Lengkap</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <input
                  class='overlap-5 w-full p-2 text-sm'
                  type='text'
                  value={nama()}
                  onChange={e => {
                    setNama(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div class='group-4'>
            <div class='group-wrapper'>
              <div class='div-wrapper'>
                <div class='text-wrapper'>Tanggal Lahir</div>
              </div>
            </div>

            <div class='group-2'>
              <div class='text-wrapper-2'>
                <input
                  type='date'
                  class='overlap-5 w-full p-2'
                  placeholder='Tanggal Lahir'
                  value={tanggalLahir()}
                  onChange={e => {
                    setTanggalLahir(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div class='group-7'>
            <div class='group-wrapper'>
              <div class='div-wrapper'>
                <div class='text-wrapper'>Nomor Telepon</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <input
                  class='overlap-5 w-full p-2 text-sm'
                  type='text'
                  value={phone()}
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div class='group-8'>
            <div class='group-wrapper'>
              <div class='div-wrapper'>
                <div class='text-wrapper'>Email</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <input
                  class='overlap-5 w-full p-2 text-sm'
                  type='email'
                  value={email()}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div class='group-11'>
            <div class='group-wrapper'>
              <div class='div-wrapper'>
                <div class='text-wrapper'>Semester</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <select
                  name=''
                  id=''
                  class='overlap-5 w-full p-2 text-sm'
                  value={semester()}
                  onChange={e => {
                    setSemester(e.target.value);
                  }}
                >
                  <option value=''>Semester</option>
                  <option value='Semester1'>Semester 1</option>
                  <option value='Semester2'>Semester 2</option>
                  <option value='Semester3'>Semester 3</option>
                  <option value='Semester4'>Semester 4</option>
                  <option value='Semester5'>Semester 5</option>
                  <option value='Semester6'>Semester 6</option>
                  <option value='Semester7'>Semester 7</option>
                  <option value='Semester8'>Semester 8</option>
                </select>
              </div>
            </div>
          </div>
          <div class='group-12'>
            <div class='group-13'>
              <div class='group-10'>
                <div class='text-wrapper-5'>Pendidikan Terakhir</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <select
                  name=''
                  id=''
                  class='overlap-5 w-full p-2 text-sm'
                  value={pTerakhir()}
                  onChange={e => {
                    setPterakhir(e.target.value);
                  }}
                >
                  <option value=''>Pendidikan Terakhir</option>
                  <option value='SD'>SD</option>
                  <option value='SMP'>SMP</option>
                  <option value='SMA'>SMA</option>
                  <option value='D3'>D3</option>
                  <option value='S1'>S1</option>
                  <option value='S2'>S2</option>
                  <option value='S3'>S3</option>
                </select>
              </div>
            </div>
          </div>
          <div class='group-14'>
            <div class='group-13'>
              <div class='group-10'>
                <div class='text-wrapper-5'>Username</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <input
                  class='overlap-5 w-full p-2 text-sm'
                  type='text'
                  value={username()}
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div class='group-15'>
            <div class='group-13'>
              <div class='group-10'>
                <div class='text-wrapper-5'>Password</div>
              </div>
            </div>
            <div class='group-2'>
              <div class='text-wrapper-2'>
                <input
                  class='overlap-5 w-full p-2 text-sm'
                  type='password'
                  value={password()}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div class='flex w-full'></div>
        {/* <div class='porfile-ubah-profile'>Profile / Ubah Profile</div> */}
      </div>
    </div>
    <dialog id='auth_modal' class='modal modal-top sm:modal-middle'>
    <div class='modal-box'>
      <h3 class='text-lg font-bold'>{modalMsg().title}</h3>
      <p class='py-4'>{modalMsg().body}</p>
      <div class='modal-action'>
          <form method='dialog' class='flex gap-4'>
            <button onclick={()=>{navigate('/profile');}} class='btn btn-outline border-2 border-primary text-primary hover:border-primary hover:bg-primary hover:text-white'>
              Oke
            </button>
          </form>
      </div>
    </div>
    </dialog>
  </>
  );
}
