import AuthModal from '@/components/modals/AuthModal';
import { loginAccount } from '@/functions/Auth';
import { A, useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';

export default function SigninPage() {
  const navigate = useNavigate();

  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [modalMsg, setModalMsg] = createSignal<any>({})
  const [success, setSuccess] = createSignal<any>()

  const handleNav = () =>{
    navigate('/dashboard')
  }

  const handleLogin = async () => {
    try{
      await loginAccount({
        username: username(),
        password: password(),
      });
      setSuccess(true)
      setModalMsg({
        title: 'Autentikasi Berhasil',
        body: 'Selamat Datang'
      })
    }catch(err){
      setSuccess(false)
      setModalMsg({
        title: 'Autentikasi Gagal',
        body: err
      })
    }finally{
      const modal = document.getElementById('auth_modal') as | HTMLDialogElement | null;
      modal && modal.showModal();
    }
  };

  return (
    <>
    <div class='flex flex-col lg:flex-row'>
      
      <div class='res-atas flex h-[100vh] w-full flex-col p-2 pt-32 lg:w-1/2 lg:gap-16 lg:overflow-hidden'>
        <div class='rectangle-login m-auto p-6'>
          <p class='mulai-aksimu-untuk text-xl md:text-lg'>
            <span class='text text-xl md:text-lg'>
              <strong>Mulai Aksimu</strong>
            </span>
            <span class='text-wrapper-8'>&nbsp;</span>
            <span class='text-wrapper-9 text-xl md:text-lg'>untuk</span>
            <span class='text-wrapper-8'>&nbsp;</span>
            <span class='span text-xl md:text-lg'>Dunia</span>
            <span class='text-wrapper-8 md:text-lg'>
              {' '}
              <br />
            </span>
            <span class='span text-xl md:text-lg'>yang lebih baik</span>
            <span class='text-wrapper-8'>&nbsp;</span>
            <span class='text-wrapper-9 text-xl md:text-lg'>untuk Semua!</span>
          </p>
          <img class='element' src='src/assets/img/2466249-1.png' />
        </div>
        <br />
        <br />
      </div>
      <div class='res-bawah flex w-full flex-col gap-2 p-2 pt-16 lg:w-1/2'>
        <div class='flex flex-row items-center items-center gap-6 p-6'>
          <img
            class='img'
            src='src/assets/img/business-education-logo-2-59B.png'
          />
          <div class='vertical-line-1'></div>
          <div class='flex flex-col justify-center'>
            <div class='text-wrapper-10'>PENDEKAR</div>
            <div class='text-wrapper-11 '>
              Pojok Education Career Scholarship
            </div>
          </div>
        </div>
        <div class='mx-16 flex w-4/5 flex-col items-start justify-center gap-8 pr-8'>
          <p class='text-wrapper-12 self-start'>Masuk</p>
          <div class='password-toggle w-full '>
            <input
              type='text'
              class='overlap-5 w-full p-2 px-4 focus:outline-none'
              name='username'
              placeholder='Username'
              value={username()}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div class='password-toggle overlap-5 flex w-full p-2 px-4'>
            <input
              type={showPassword() ? 'text' : 'password'}
              class='w-full focus:outline-none'
              name='password'
              placeholder='Password'
              value={password()}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword())}>
              {showPassword() ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 20 20'
                >
                  <g fill='currentColor'>
                    <path
                      fill-rule='evenodd'
                      d='M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38a1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194zm4.472 4.47l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092A4 4 0 0 0 7.752 6.69'
                      clip-rule='evenodd'
                    />
                    <path d='m10.748 13.93l2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678' />
                  </g>
                </svg>
              )}
            </button>
          </div>
          <button
            class='overlap-6 mt-5 w-full px-4 py-3 hover:bg-[#3162C4]'
            onClick={() => {
              handleLogin();
            }}
          >
            <div class='text-wrapper-16 '>Masuk</div>
          </button>
          <p class='belum-punya-akun'>
            <span class='text-wrapper-14'>Belum punya akun? </span>{' '}
            <span class='text-wrapper-15'>
              <A href='/signup' id='auth'>
                Daftar
              </A>
            </span>
          </p>
        </div>
      </div>
    </div>
    <dialog id='auth_modal' class='modal modal-top sm:modal-middle'>
      <div class='modal-box'>
        <h3 class='text-lg font-bold'>{modalMsg().title}</h3>
        <p class='py-4'>{modalMsg().body}</p>
        <div class='modal-action'>
          <form method='dialog'>
            <button onclick={()=> { success() ? handleNav() : '' }} class='btn btn-outline border-2 border-error text-error hover:border-error hover:bg-error hover:text-white'>
              Oke
            </button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  );
}
