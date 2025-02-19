import { addBookmark, checkExist, deleteByRef, getBookmark } from '@/functions/Bookmark';
import { addDaftar, checkDaftar, deleteByRefDaftar, getDaftar } from '@/functions/Daftar';
import { getJobById } from '@/functions/Jobs';
import { getBeasiswaById } from '@/functions/Scholarship';
import { A } from '@solidjs/router';
import { Suspense, createEffect, createSignal, lazy } from 'solid-js';

const Beasiswa = lazy(async () => {
  const module = await import("@/components/boomark-component/ItemBeasiswa");
  return { default: module.default };
});

const Event = lazy(async () => {
  const module = await import("@/components/boomark-component/ItemEvent");
  return { default: module.default };
});

const Lowongan = lazy(async () => {
  const module = await import("@/components/boomark-component/ItemLowongan");
  return { default: module.default };
});

export default function BookmarkPage() {
  const [selected, setSelected] = createSignal('')
  const [previous, setPrevious] = createSignal('')
  const [saved, setSaved] = createSignal<any>(false)

  const [active, setActive] = createSignal('event')
  const [event, setEvent] = createSignal([])
  const [beasiswa, setBeasiswa] = createSignal([])
  const [lowongan, setLowongan] = createSignal([])

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
    const res = await getBookmark()
    const dataEvent = await res.filter((obj: { id_event: null; }) => obj.id_event !== null)
    const dataBeasiswa = await res.filter((obj: { id_beasiswa: null; }) => obj.id_beasiswa !== null)
    const dataJob = await res.filter((obj: { id_lowongan: null; }) => obj.id_lowongan !== null)

    setEvent(dataEvent)
    setBeasiswa(dataBeasiswa)
    setLowongan(dataJob)
    
    setSelected(dataJob[0].id_lowongan)
    
  },[])

  const handleChange = (type: any) =>{
    switch(type){
      case 'event' : {
        document.getElementById('event')?.classList.remove('border-white')
        document.getElementById('event')?.classList.add('border-violet-700')
        document.getElementById('beasiswa')?.classList.add('border-white')
        document.getElementById('lowongan')?.classList.add('border-white')
        setActive(type)
      } break;
      case 'beasiswa' : {
        document.getElementById('beasiswa')?.classList.remove('border-white')
        document.getElementById('event')?.classList.add('border-white')
        document.getElementById('beasiswa')?.classList.add('border-emerald-600')
        document.getElementById('lowongan')?.classList.add('border-white')
        setActive(type)
      } break;
      case 'lowongan' : {
        document.getElementById('lowongan')?.classList.remove('border-white')
        document.getElementById('event')?.classList.add('border-white')
        document.getElementById('beasiswa')?.classList.add('border-white')
        document.getElementById('lowongan')?.classList.add('border-red-600')
        setActive(type)
      } break;
    }
  }

  const JobContainer = () =>{
    const [data, setData] = createSignal<any>({})
    const [active, setActive] = createSignal()
    const [daftar, setDaftar] = createSignal(false)
    const [request, setRequest] = createSignal<any>(false);
    const [modalMsg, setModalMsg] = createSignal<any>({});

    createEffect(async()=>{
      const res = await getJobById(selected())
      setData(res)
      await buttonChange(res.id_lowongan)
      await daftarChange(res.id_lowongan)
    }, data)

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

    // const handleDaftar = async (id: any) => {
    //   let existence = await checkDaftar(id, 'Lowongan');
    //   if (!existence) {
    //     const res = await addDaftar('Lowongan', id);
    //     document.getElementById(`bd-${id}`)?.classList.add('bg-slate-400');
    //     document.getElementById(`bd-${id}`)?.classList.add('cursor-not-allowed');
    //     document.getElementById(`bd-${id}`)?.classList.remove('btn-primary');
    //     document.getElementById(`bd-${id}`)?.classList.remove('text-blue-500');
    //     setDaftar(true)
    //     alert(res);
    //   } 
    // };

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
            <div class=' h-10 w-full rounded-3xl border border-solid border-blue-500'>
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
            <div innerHTML={data().deskripsi_lowongan} class="font-['DM Sans'] w-full text-base font-normal capitalize leading-snug tracking-tight text-black px-6">
              
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
    <>
    <div class='flex min-h-screen w-full pl-4'>
      <div class='flex w-full flex-col gap-6'>
        <div class='mx-auto flex w-[100%] justify-end py-6 gap-4 px-6'>
          <button onClick={()=>{handleChange('event')}} id='event' class='flex w-56 items-center justify-center rounded-3xl border-2 border-violet-700 bg-white p-2 drop-shadow-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 16 16'
            >
              <path
                fill='#8A59F1'
                fill-rule='evenodd'
                d='M14.5 2H9l-.35.15l-.65.64l-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74zM14 12H9l-.35.15l-.14.13V3.7l.7-.7H14zM6 5H3v1h3zm0 4H3v1h3zM3 7h3v1H3zm10-2h-3v1h3zm-3 2h3v1h-3zm0 2h3v1h-3z'
                clip-rule='evenodd'
              />
            </svg>
            <p class='px-6'>Event</p>
          </button>
          <button onClick={()=>{handleChange('beasiswa')}} id='beasiswa' class='flex w-56 items-center justify-center rounded-3xl border-2 bg-white p-2 drop-shadow-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path
                fill='#03A631'
                d='M4 11.333L0 9l12-7l12 7v8.5h-2v-7.333l-2 1.166v6.678l-.223.275A9.983 9.983 0 0 1 12 22a9.983 9.983 0 0 1-7.777-3.714L4 18.011zM6 12.5v4.792A7.979 7.979 0 0 0 12 20a7.978 7.978 0 0 0 6-2.708V12.5L12 16zM3.97 9L12 13.685L20.03 9L12 4.315z'
              />
            </svg>
            <p class='px-6'>Beasiswa</p>
          </button>
          <button onClick={()=>{handleChange('lowongan')}} id='lowongan' class='flex w-56 items-center justify-center rounded-3xl border-2 bg-white p-2 drop-shadow-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 512 512'
            >
              <path
                fill='#F15959'
                d='M336 288H176v-32H16v196a12 12 0 0 0 12 12h456a12 12 0 0 0 12-12V256H336Zm160-164a12 12 0 0 0-12-12H384V56a8 8 0 0 0-8-8H136a8 8 0 0 0-8 8v56H28a12 12 0 0 0-12 12v100h480Zm-152-12H168V88h176Z'
              />
            </svg>
            <p class='px-6'>Lowongan Kerja</p>
          </button>
        </div>
        <div class={active()==='beasiswa' || active()==='event' ? 'grid grid-cols-3 gap-4' : 'flex w-full gap-4 pl-4 '} >

          {

            active() === 'event' ?
              event().map((value:any)=>{
                return (
                  <Suspense>
                    <Event id_event={value.id_event}/>
                  </Suspense>
                )
              })
            :

            active() === 'beasiswa' ?
              beasiswa().map((value : any)=>{
                
                return (
                  <Suspense>
                    <Beasiswa id_beasiswa={value.id_beasiswa}/>
                  </Suspense>
                )
              })

            :

            active() === 'lowongan' ?
            <>
            <div class='flex h-[79vh] w-[30rem] flex-col gap-4 overflow-auto'>
              {lowongan().map((value:any)=>{
                return(
                    <Suspense>
                      <a class='cursor-pointer flex flex-col gap-2 rounded-[20px] bg-white p-4 border-2 border-transparent' id={value.id_lowongan} onClick={()=>{setSelected(value.id_lowongan); handleSelect()}}>
                      <Lowongan id_lowongan={value.id_lowongan}/>
                      </a>
                    </Suspense>
                )
              })}
            </div>
            <div class='flex h-[79vh] w-[50rem] flex-col gap-4 overflow-auto rounded-2xl bg-white p-12 p-4'>
                <JobContainer/>
            </div>
            </>
            :
            
            ''

          }



        </div>
      </div>
    </div>
    </>
  );
}
