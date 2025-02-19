import { addBookmark, checkExist, deleteByRef } from "@/functions/Bookmark";
import { addDaftar, checkDaftar, deleteByRefDaftar } from "@/functions/Daftar";
import { getAllJobs } from "@/functions/Jobs";
import { createEffect, createSignal } from "solid-js";

export default function JobsPage() {
  const [selected, setSelected] = createSignal('')
  const [previous, setPrevious] = createSignal('')
  const [allData, setAllData] = createSignal<any>([])
  const [selectedData, setSelectedData] = createSignal<any>({})
  const [saved, setSaved] = createSignal<any>(false)

  const handleSelect = () => {
    
    const element = document.getElementById(selected())
    if(previous()){
      const element2 = document.getElementById(previous())
      element2?.classList.remove('border-blue-400')
      element2?.classList.add('border-transparent')
    }
    element?.classList.add('border-blue-400')
    element?.classList.remove('border-transparent')
    
    setPrevious(selected())
  }

  createEffect(async()=>{
    const data = await getAllJobs()
    setAllData(data)
    if(data){
      setSelectedData(data[0])
    }
    
  },[])

  const JobContainer = () =>{
    const [data, setData] = createSignal<any>({})
    const [active, setActive] = createSignal()
    const [saved, setSaved] = createSignal(false)
    const [daftar, setDaftar] = createSignal(false)
    const [request, setRequest] = createSignal<any>(false);
    const [modalMsg, setModalMsg] = createSignal<any>({});

    createEffect(async()=>{
      setData(selectedData())
      await buttonChange(selectedData().id_lowongan)
      await daftarChange(selectedData().id_lowongan)
    }, selectedData().id_lowongan)

    const buttonChange = async(id: any) => {
      let existence = await checkExist(id, "Lowongan")
      if(existence){
        document.getElementById(`bm-${id}`)?.classList.add('bg-blue-600')
        document.getElementById(`bm-${id}`)?.classList.add('text-white')
        document.getElementById(`bm-${id}`)?.classList.remove('bg-white')
        setActive(true)
      }else{
        document.getElementById(`bm-${id}`)?.classList.add('bg-white')
        document.getElementById(`bm-${id}`)?.classList.remove('text-white')
        document.getElementById(`bm-${id}`)?.classList.remove('bg-blue-600')
        setActive(false)
      }
    }

    const daftarChange = async(id: any) => {
      let existence = await checkDaftar(id, "Lowongan")
      if(existence){
        document.getElementById(`bd-${id}`)?.classList.add('bg-slate-400');
        document.getElementById(`bd-${id}`)?.classList.add('cursor-not-allowed');
        document.getElementById(`bd-${id}`)?.classList.remove('btn-primary');
        document.getElementById(`bd-${id}`)?.classList.remove('text-blue-500');
        setDaftar(true)
      } else {
        document.getElementById(`bd-${id}`)?.classList.remove('bg-slate-400');
        document.getElementById(`bd-${id}`)?.classList.remove('cursor-not-allowed');
        document.getElementById(`bd-${id}`)?.classList.add('btn-primary');
        document.getElementById(`bd-${id}`)?.classList.add('text-blue-500');
        setDaftar(false)
      }
    }

    const handleBookmark = async(id:any) =>{
      let existence = await checkExist(id, "Lowongan")
      if(existence){
        const res = await deleteByRef(id, "Lowongan")
        document.getElementById(`bm-${id}`)?.classList.add('bg-white')
        document.getElementById(`bm-${id}`)?.classList.remove('text-white')
        document.getElementById(`bm-${id}`)?.classList.remove('bg-blue-600')
        setActive(false)
        setSaved(false)
        alert(res)
      }else{
        const res = await addBookmark("Lowongan", id)
        document.getElementById(`bm-${id}`)?.classList.add('bg-blue-600')
        document.getElementById(`bm-${id}`)?.classList.add('text-white')
        document.getElementById(`bm-${id}`)?.classList.remove('bg-white')
        setActive(true)
        setSaved(true)
        alert(res)
      }
    }

    const handlePopUp = async(id: any, name: any) => {
      const res = await checkDaftar(id, 'Lowongan');
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
      const modal = document.getElementById(`lowongan_modal`,) as HTMLDialogElement | null;
      modal && modal.showModal();
    };

    const handleDaftar = async (id: any) => {
      if(!request()){
        let existence = await checkDaftar(id, 'Lowongan');
        if (!existence) {
          setRequest(true)
          const res = await addDaftar('Lowongan', id);
          document.getElementById(`bd-${id}`)?.classList.add('bg-slate-400');
          document.getElementById(`bd-${id}`)?.classList.add('cursor-not-allowed');
          document.getElementById(`bd-${id}`)?.classList.remove('btn-primary');
          document.getElementById(`bd-${id}`)?.classList.remove('text-blue-500');
          setDaftar(true)
          setModalMsg({
            title: 'Ikuti Kegiatan',
            body: res,
            id
          });
          const modal = document.getElementById(`lowongan_modal`) as HTMLDialogElement | null;
          modal && modal.showModal();
        } else {
          setRequest(true)
          const res = await deleteByRefDaftar(id, 'Lowongan');
          document.getElementById(`bd-${id}`)?.classList.remove('bg-slate-400');
          document.getElementById(`bd-${id}`)?.classList.remove('cursor-not-allowed');
          document.getElementById(`bd-${id}`)?.classList.add('btn-primary');
          document.getElementById(`bd-${id}`)?.classList.add('text-blue-500');
          setDaftar(false)
          setModalMsg({
            title: 'Ikuti Kegiatan',
            body: res,
            id
          });
          const modal = document.getElementById(`lowongan_modal`) as HTMLDialogElement | null;
          modal && modal.showModal();
        }
      }else{
        setRequest(false);
      }
    };

    return (
      <>
      <div class='flex w-full flex-col justify-center gap-6'>
          <div class='flex flex-col gap-2'>
            <h2 class="font-['DM Sans'] text-2xl font-bold capitalize leading-loose tracking-tight text-black">
              {data().judul_lowongan}
            </h2>

            <p>{data().role}</p>

            <p>{data().perusaahan}</p>

            <p>{data().lokasi}</p>
          </div>

          <div class='flex items-center gap-4'>
            <div class=' h-10 w-full'>
              <button id={`bd-${data().id_lowongan}`} onClick={()=>{handlePopUp(data().id_lowongan, data().judul_lowongan)}} class=' font-dmSans rounded-3xl border border-solid border-blue-500 flex h-full w-full items-center justify-center text-lg font-bold leading-6 text-blue-500'>
              { daftar() ? 'Sedang Diikuti' : 'Ikut Kegiatan' }
              </button>
            </div>
            <div class=' h-10 w-full'>
              <button id={`bm-${data().id_lowongan}`} onClick={()=>{handleBookmark(data().id_lowongan)}} class='rounded-3xl border border-solid border-blue-500 font-dmSans flex h-full w-full items-center justify-center text-lg font-bold leading-6 text-blue-500'>
                { active() ? 'Hapus' : 'Simpan' }
              </button>
            </div>
          </div>
          <div class='flex flex-col gap-4'>
            <div class="font-['DM Sans'] w-96 text-2xl font-bold capitalize leading-loose tracking-tight text-black px-4">
              Deskripsi Kegiatan
            </div>
            <div innerHTML={selectedData().deskripsi_lowongan} class="font-['DM Sans'] w-full text-base font-normal capitalize leading-snug tracking-tight text-black px-6">
              
            </div>
          </div>
        </div>
        <dialog id='lowongan_modal' class='modal modal-top sm:modal-middle'>
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

  return (
    <div class='flex w-full gap-4 pl-4 '>
      <div class='flex h-[79vh] w-[30rem] flex-col gap-4 overflow-auto'>
        

        {
          allData().map((val : any)=>{
            return(
              <a href='#' class='flex flex-col gap-2 rounded-[20px] bg-white p-4 border-2 border-transparent' id={val.id_lowongan} onClick={()=>{setSelected(val.id_lowongan); setSelectedData(val); handleSelect()}}>
                <div class="font-['DM Sans'] text-lg font-bold leading-[30px] text-blue-950">
                  {val.judul_lowongan}
                </div>

                <p>{val.role}</p>

                <p>{val.perusaahan}</p>

                <p>{val.lokasi}</p>
              </a>
            )
          })
        }
        

      </div>

      <div class='flex h-[79vh] w-[50rem] flex-col gap-4 overflow-auto rounded-2xl bg-white p-12 p-4'>
        <JobContainer/>
      </div>
    </div>
  );
}
