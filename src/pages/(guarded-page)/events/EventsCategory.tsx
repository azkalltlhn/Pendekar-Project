import { createEffect, createSignal } from 'solid-js';
import { NavLink } from '@solidjs/router';
import { getEventByJenis } from '@/functions/Event';
import { addBookmark, checkExist, deleteByRef, getBookmark } from '@/functions/Bookmark';
import { addDaftar, checkDaftar, deleteByRefDaftar, getDaftar } from '@/functions/Daftar';

interface EventsCategoryProps {
  category: string;
}

export default function EventsCategory({ category }: EventsCategoryProps) {
  const [event, setEvent] = createSignal<any>([]);
  const [modalMsg, setModalMsg] = createSignal<any>({});
  const [request, setRequest] = createSignal<any>(false);

  createEffect(async () => {
    const data = await getEventByJenis(category);
    setEvent(data as any);
    checkBookmark()
    checkPendaftaran()
  }, []);

  const handleBookmark = async (id: any) => {
    let existence = await checkExist(id, 'Event');
    if (existence) {
      const res = await deleteByRef(id, 'Event');
      document.getElementById(id)?.classList.remove('bg-blue-600');
      document.getElementById(id)?.classList.add('bg-white');
      document
        .getElementById(`ic-${id}`)
        ?.setAttribute('stroke', 'currentColor');
      alert(res);
    } else {
      const res = await addBookmark('Event', id);
      document.getElementById(id)?.classList.add('bg-blue-600');
      document.getElementById(id)?.classList.remove('bg-white');
      document.getElementById(`ic-${id}`)?.setAttribute('stroke', 'white');
      alert(res);
    }
  };

  const checkBookmark = async () => {
    const res = await getBookmark();
    Object.values(res).map((val: any) => {
      if (val.id_event) {
        document.getElementById(val.id_event)?.classList.add('bg-blue-600');
        document.getElementById(val.id_event)?.classList.remove('bg-white');
        document
          .getElementById(`ic-${val.id_event}`)
          ?.setAttribute('stroke', 'white');
      }
    });
  };

  const handlePopUp = async(id: any, name: any) => {
    const res = await checkDaftar(id, 'Event');
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
      let existence = await checkDaftar(id, 'Event');
      if (!existence) {
        setRequest(true)
        const res = await addDaftar('Event', id);
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
        const res = await deleteByRefDaftar(id, 'Event');
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
      if (val.id_event) {
        document.getElementById(`btn-${val.id_event}`)?.classList.add('bg-slate-400');
        document.getElementById(`btn-${val.id_event}`)?.classList.add('cursor-not-allowed');
        document.getElementById(`btn-${val.id_event}`)?.classList.remove('btn-primary');
      }
    });
  };

  return (
    <>
    <section class='grid min-h-screen gap-4'>
      <div class='justify-venter flex flex-wrap gap-6'>
        {event()?.map((val: any) => {
          return (
            <div class='flex h-96 w-[30%] flex-col items-center justify-center gap-y-4 rounded-3xl bg-white p-5 dark:bg-gray-800'>
              <div class='group relative h-[200px] w-full flex-none overflow-hidden rounded-2xl bg-blue-300'>
                <button 
                id={val.id_event}
                onClick={() => {
                  handleBookmark(val.id_event);
                }}
                class='absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white transition duration-150 hover:bg-gray-200'>
                  <svg
                    class='h-4 w-4 text-primary dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 20'
                  >
                    <path
                      id={`ic-${val.id_event}`}
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
                    src={val.poster_event}
                    alt={'Event Poster'}
                    class='w-full transform transition-transform group-hover:scale-105'
                  />
                  <button class='absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100'>
                    <NavLink
                      class='rounded-xl bg-blue-950 p-3 text-lg font-bold text-white'
                      href={`/events/category/${val.bidang_event}/${val.id_event}`}
                    >
                      <p>Lihat Kegiatan</p>
                    </NavLink>
                  </button>
                </div>
              </div>
              <div class='w-full'>
                <div class='mb-1 line-clamp-1 font-dm-sans text-xl font-bold text-[#1B2559] transition duration-150 hover:text-primary'>
                  <h1>{val.judul_event}</h1>
                </div>
              </div>
              <button onClick={()=>{handlePopUp(val.id_event, val.judul_event)}} id={`btn-${val.id_event}`} class='btn btn-circle btn-primary btn-block font-dm-sans'>
                Ikut Kegiatan
              </button>
            </div>
          );
        })}
      </div>
    </section>

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
