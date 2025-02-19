import { NavLink } from '@solidjs/router';
import { createEffect, createSignal } from 'solid-js';
import { getAllBeasiswa } from '@/functions/Scholarship';
// import Frame16 from '../../assets/img/frame16.svg';
// import Frame17 from '../../assets/img/frame17.svg';
// import Frame18 from '../../assets/img/frame18.svg';
import {
  addBookmark,
  checkExist,
  deleteByRef,
  getBookmark,
} from '@/functions/Bookmark';
import CarouselBeasiswa from '../../layouts/carousel-beasiswa';
import { addDaftar, checkDaftar, deleteByRefDaftar, getDaftar } from '@/functions/Daftar';

export default function ScholarshipsPage() {
  const [beasiswa, setBeasiswa] = createSignal<any>([]);
  const [request, setRequest] = createSignal<any>(false);
  const [modalMsg, setModalMsg] = createSignal<any>({});

  createEffect(async () => {
    const dataBeasiswa = await getAllBeasiswa();
    setBeasiswa(dataBeasiswa);
    checkBookmark();
    checkPendaftaran()
  }, []);

  const handleBookmark = async (id: any) => {
    let existence = await checkExist(id, 'Beasiswa');
    if (existence) {
      const res = await deleteByRef(id, 'Beasiswa');
      document.getElementById(id)?.classList.remove('bg-blue-600');
      document.getElementById(id)?.classList.add('bg-white');
      document
        .getElementById(`ic-${id}`)
        ?.setAttribute('stroke', 'currentColor');
      alert(res);
    } else {
      const res = await addBookmark('Beasiswa', id);
      document.getElementById(id)?.classList.add('bg-blue-600');
      document.getElementById(id)?.classList.remove('bg-white');
      document.getElementById(`ic-${id}`)?.setAttribute('stroke', 'white');
      alert(res);
    }
  };

  const checkBookmark = async () => {
    const res = await getBookmark();
    Object.values(res).map((val: any) => {
      if (val.id_beasiswa) {
        document.getElementById(val.id_beasiswa)?.classList.add('bg-blue-600');
        document.getElementById(val.id_beasiswa)?.classList.remove('bg-white');
        document
          .getElementById(`ic-${val.id_beasiswa}`)
          ?.setAttribute('stroke', 'white');
      }
    });
  };

  const handlePopUp = async(id: any, name: any) => {
    const res = await checkDaftar(id, 'Beasiswa');
    if (res) {
      setModalMsg({
        title: 'Ikuti Kegiatan',
        body: `Apakah kamu yakin ingin berhenti mengikuti kegiatan ${name}.`,
        id
      });
    }else{
      setModalMsg({
        title: 'Ikuti Kegiatan',
        body: `Apakah kamu yakin ingin mengikuti kegiatan ${name}?`,
        id
      });
    }
    const modal = document.getElementById('auth_modal',) as HTMLDialogElement | null;
    modal && modal.showModal();
  };

  const handleDaftar = async (id: any) => {
    if(!request()){
      let existence = await checkDaftar(id, 'Beasiswa');
      if (!existence) {
        setRequest(true)
        const res = await addDaftar('Beasiswa', id);
        document.getElementById(`btn-${id}`)?.classList.add('bg-slate-400');
        document.getElementById(`btn-${id}`)?.classList.add('cursor-not-allowed');
        document.getElementById(`btn-${id}`)?.classList.remove('btn-primary');
        setModalMsg({
          title: 'Ikuti Kegiatan',
          body: res,
          id
        });
        const modal = document.getElementById('auth_modal',) as HTMLDialogElement | null;
        modal && modal.showModal();
      } else {
        setRequest(true)
        const res = await deleteByRefDaftar(id, 'Beasiswa');
        document.getElementById(`btn-${id}`)?.classList.remove('bg-slate-400');
        document.getElementById(`btn-${id}`)?.classList.remove('cursor-not-allowed');
        document.getElementById(`btn-${id}`)?.classList.add('btn-primary');
        setModalMsg({
          title: 'Ikuti Kegiatan',
          body: res,
          id
        });
        const modal = document.getElementById('auth_modal',) as HTMLDialogElement | null;
        modal && modal.showModal();
      }
    }else{
      setRequest(false);
    }
  };

  const checkPendaftaran = async () => {
    const res = await getDaftar();
    Object.values(res).map((val: any) => {
      if (val.id_beasiswa) {
        document.getElementById(`btn-${val.id_beasiswa}`)?.classList.add('bg-slate-400');
        document.getElementById(`btn-${val.id_beasiswa}`)?.classList.add('cursor-not-allowed');
        document.getElementById(`btn-${val.id_beasiswa}`)?.classList.remove('btn-primary');
      }
    });
  };

  return (
    <>
    <div class='flex min-h-screen w-full pb-16 pl-4 pt-8'>
      <div class='flex w-full flex-col gap-6'>
        <div class='carousel w-full gap-6'>
          <div id='item1' class='w-full flex justify-center'>
            <CarouselBeasiswa />
          </div>
        </div>
        

        <div class='grid grid-cols-3 gap-4'>
          {beasiswa().map((val: any) => (
            <div class='flex flex-col items-center justify-center gap-y-4 rounded-3xl bg-white p-5 dark:bg-gray-800'>
              <div class='group relative h-[200px] w-full flex-none overflow-hidden rounded-2xl bg-blue-300'>
                <button
                  id={val.id_beasiswa}
                  onClick={() => {
                    handleBookmark(val.id_beasiswa);
                  }}
                  class={
                    'absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white transition duration-150'
                  }
                >
                  <svg
                    class='h-4 w-4 text-primary dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 20'
                  >
                    <path
                      id={`ic-${val.id_beasiswa}`}
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z'
                    />
                  </svg>
                </button>
                <div class='absolute inset-0 overflow-hidden transition-opacity group-hover:opacity-80'>
                  <img
                    src={val.poster_beasiswa}
                    alt={'Beasiswa Poster 1'}
                    class='w-full transform transition-transform group-hover:scale-105'
                  />
                  <button class='absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100'>
                    <a
                      class='rounded-xl bg-blue-950 p-3 text-lg font-bold text-white'
                      href={`/scholarships-detail/${val.id_beasiswa}`}
                    >
                      <p>Lihat Kegiatan</p>
                    </a>
                  </button>
                </div>
              </div>
              <div class='w-full'>
                <div class='mb-1 line-clamp-1 font-dm-sans text-xl font-bold text-[#1B2559] transition duration-150 hover:text-primary'>
                  <h1>{val.judul_beasiswa}</h1>
                </div>
              </div>
              <button
              id={`btn-${val.id_beasiswa}`}
              onClick={()=>{handlePopUp(val.id_beasiswa, val.judul_beasiswa)}}
              class='btn btn-circle btn-primary btn-block font-dm-sans'>
                Ikut Kegiatan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>

    <dialog id='auth_modal' class='modal modal-top sm:modal-middle'>
    <div class='modal-box'>
      <h3 class='text-lg font-bold'>{modalMsg().title}</h3>
      <p class='py-4'>{modalMsg().body}</p>
      <div class='modal-action'>
          <form method='dialog' class='flex gap-4'>
            <button onclick={()=>{ handleDaftar(modalMsg().id) }} class='btn btn-outline border-2 border-primary text-primary hover:border-primary hover:bg-primary hover:text-white'>
              Oke
            </button>
            <button class='btn btn-outline border-2 border-error text-error hover:border-error hover:bg-error hover:text-white'>
              Batal
            </button>
          </form>
      </div>
    </div>
    </dialog>
  </>
  );
}
