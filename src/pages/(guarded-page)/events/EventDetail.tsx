import { createEffect, createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import { getEventById } from '@/functions/Event';
import { addBookmark, checkExist, deleteByRef } from '@/functions/Bookmark';
import { addDaftar, checkDaftar, deleteByRefDaftar } from '@/functions/Daftar';

const EventDetail = () => {
  const params = useParams();
  const [eventData, setEventData] = createSignal<any>({});
  const [saved, setSaved] = createSignal<any>(false)
  const [daftar, setDaftar] = createSignal<any>(false)
  const [modalMsg, setModalMsg] = createSignal<any>({});
  const [request, setRequest] = createSignal<any>(false);

  createEffect(async () => {
    const data = await getEventById(params.id);
    setEventData(data as any);

    let existence = await checkExist(Number(params.id), "Event")
    if(existence){
      document.getElementById('bookmark')?.classList.add('bg-blue-600')
      document.getElementById('bookmark')?.classList.add('text-white')
      setSaved(true)
    }else{
      document.getElementById('bookmark')?.classList.add('btn-outline')
    }
    let daftar = await checkDaftar(Number(params.id), "Event")
    if(daftar){
      document.getElementById(`daftar`)?.classList.add('bg-slate-400');
      document.getElementById(`daftar`)?.classList.add('cursor-not-allowed');
      document.getElementById(`daftar`)?.classList.remove('btn-primary');
      setDaftar(true)
    }
  }, []);

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
        document.getElementById(`daftar`)?.classList.add('bg-slate-400');
        document.getElementById(`daftar`)?.classList.add('cursor-not-allowed');
        document.getElementById(`daftar`)?.classList.remove('btn-primary');
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
        document.getElementById(`daftar`)?.classList.remove('bg-slate-400');
        document.getElementById(`daftar`)?.classList.remove('cursor-not-allowed');
        document.getElementById(`daftar`)?.classList.add('btn-primary');
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

  const handleBookmark = async(id:any) =>{
    let existence = await checkExist(id, "Event")
    if(existence){
      const res = await deleteByRef(id, "Event")
      document.getElementById('bookmark')?.classList.remove('bg-blue-600')
      document.getElementById('bookmark')?.classList.remove('text-white')
      document.getElementById('bookmark')?.classList.add('btn-outline')
      setSaved(false)
      alert(res)
    }else{
      const res = await addBookmark("Event", id)
      document.getElementById('bookmark')?.classList.add('bg-blue-600')
      document.getElementById('bookmark')?.classList.add('text-white')
      document.getElementById('bookmark')?.classList.remove('btn-outline')
      setSaved(true)
      alert(res)
    }
  }

  return (
    <>
    <section class='min-h-screen rounded-3xl bg-white p-8'>
      <div class='flex h-80 w-full gap-5'>
        <div class='relative h-80 w-64 flex-none overflow-hidden bg-blue-300'>
          <div class='absolute inset-0'>
            <img
              src={eventData().poster_event}
              alt={'Event Poster'}
              class='w-full'
            />
          </div>
        </div>
        <div class='flex flex-col justify-evenly py-4'>
          <h1 class='font-dm-sans text-2xl font-bold text-base-content'>
            {eventData().judul_event}
          </h1>
          <div class='flex items-center'>
            <h2 class='rounded-full bg-success px-6 py-2 font-poppins text-2xl'>
              {eventData().bidang_event}
            </h2>
            <span class='mx-12 block h-5 border-r border-[#E7EDF3]'></span>
            <p class='font-poppins text-2xl text-primary'>
              {eventData().hastag_event}
            </p>
          </div>
          <div>
            <button onClick={()=>{handlePopUp(eventData().id_event, eventData().judul_event)}} id='daftar' class='btn btn-primary mr-8 text-xl'>{daftar() ? 'Sedang Diikuti' : 'Ikut Kegiatan'}</button>
            <button onClick={()=>{handleBookmark(eventData().id_event)}} id='bookmark' class='group btn btn-primary text-xl'>
              <svg
                class='h-4 w-4 text-primary group-hover:text-white dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 20'
              >
                <path
                  stroke= {saved() ? 'white' : 'currentColor'}
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z'
                />
              </svg>
              {saved() ? 'Hapus' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>

      <article class='mt-10'>
        <h2 class='font-dm-sans text-xl font-bold text-base-content'>
          Deskripsi Kegiatan
        </h2>
        <div
          class='mt-5 p-6 font-dm-sans'
          id='desc'
          innerHTML={eventData().deskripsi_event}
        ></div>
      </article>
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
};

export default EventDetail;
