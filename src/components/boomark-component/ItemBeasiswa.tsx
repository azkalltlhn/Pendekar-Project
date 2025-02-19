import { addDaftar, checkDaftar, deleteByRefDaftar, getDaftar } from "@/functions/Daftar"
import { getBeasiswaById } from "@/functions/Scholarship"
import { createEffect, createSignal } from "solid-js"

const ItemBeasiswa = (props:any) =>{
    const [data, setData] = createSignal<any>({})
    const [daftar, setDaftar] = createSignal<any>(false)
    const [request, setRequest] = createSignal<any>(false);
    const [modalMsg, setModalMsg] = createSignal<any>({});

    createEffect(async()=>{
        const val = await getBeasiswaById(props.id_beasiswa)
        setData(val)
        checkPendaftaran()
    })

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
      const modal = document.getElementById(`beasiswa_modal_${id}`,) as HTMLDialogElement | null;
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
          const modal = document.getElementById(`beasiswa_modal_${id}`) as HTMLDialogElement | null;
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
          const modal = document.getElementById(`beasiswa_modal_${id}`) as HTMLDialogElement | null;
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
    return(
      <>
      <div class='flex flex-col items-center justify-center gap-y-4 rounded-3xl bg-white p-5 dark:bg-gray-800'>
      <div class='group relative h-[200px] w-full flex-none overflow-hidden rounded-2xl bg-blue-300'>
        <div class='absolute inset-0 overflow-hidden transition-opacity group-hover:opacity-80'>
          <img
            src={data().poster_beasiswa}
            alt={'Beasiswa Poster 1'}
            class='w-full transform transition-transform group-hover:scale-105'
          />
          <button class='absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100'>
            <a
              class='rounded-xl bg-blue-950 p-3 text-lg font-bold text-white'
              href={`/scholarships-detail/${data().id_beasiswa}`}
            >
              <p>Lihat Kegiatan</p>
              
            </a>
          </button>
        </div>
      </div>
      <div class='w-full'>
        <a
          href={'/scholarships-detail'}
          class='mb-1 line-clamp-1 font-dm-sans text-xl font-bold text-[#1B2559] transition duration-150 hover:text-primary'
        >
          <h1>{data().judul_beasiswa}</h1>
        </a>
      </div>
      <button  id={`btn-${data().id_beasiswa}`} onClick={()=>{handlePopUp(data().id_beasiswa, data().judul_beasiswa)}}  class='btn btn-circle btn-primary btn-block font-dm-sans'>
        Ikut Kegiatan
      </button>
    </div>
    <dialog id={`beasiswa_modal_${modalMsg().id}`} class='modal modal-top sm:modal-middle'>
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
    )
  }

  export default ItemBeasiswa 