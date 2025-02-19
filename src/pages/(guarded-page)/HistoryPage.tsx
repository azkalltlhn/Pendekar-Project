
import { getDaftar } from "@/functions/Daftar";
import { getEventById } from "@/functions/Event";
import IndonesianDate from "@/functions/IndonesianDate";
import { getJobById } from "@/functions/Jobs";
import { getBeasiswaById } from "@/functions/Scholarship";
import { createEffect, createSignal } from "solid-js";

export default function HistoryPage() {

    const [data, setData] = createSignal<any[]>([])

    createEffect(async()=>{
        setData([])
        const res = await getDaftar()
        Object.values(res).forEach(async (val : any)=>{
            if(val.id_event){
                const item = await getEventById(val.id_event);
                setData((prevData) => [...prevData, {nama: item.judul_event, bidang: item.bidang_event, tanggal: val.created }]);
            }
            if(val.id_beasiswa){
                const item = await getBeasiswaById(val.id_beasiswa);
                setData((prevData) => [...prevData, {nama: item.judul_beasiswa, bidang: 'Beasiswa', tanggal: val.created }]);
            }
            if(val.id_lowongan){
                const item = await getJobById(val.id_lowongan);
                setData((prevData) => [...prevData, {nama: item.judul_lowongan, bidang: 'Loker', tanggal: val.created }]);
            }
        })
    }, [])

    return (
    <>
    <div class="w-full bg-white rounded-xl min-h-[80vh] p-12">
        <h1 class=" font-bold capitalize tracking-tight text-blue-900 text-xl mb-6">Kegiatan yang sedang diikuti</h1>
        <table class="w-full">
            <thead class="border-b-2 border-gray-200">
                <tr>
                    <th class="py-4 text-left">Nama Kegiatan</th>
                    <th>Bidang</th>
                    <th>Waktu Pendaftaran</th>
                </tr>
            </thead>
            <tbody>
                {
                    //@ts-ignore
                    data().sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal)).map((val:any)=>{
                        return(
                            <tr class="py-6">
                                <td class="py-4 w-min-content">{val.nama}</td>
                                <td class="px-4 text-center w-min-content">
                                    <div class={`rounded-full p-2 ${ val.bidang === 'Loker' ? 'bg-red-400' : val.bidang === 'Beasiswa' ? 'bg-blue-400' : 'bg-success' } `}>
                                    {val.bidang}

                                    </div>
                                    
                                </td>
                                <td class="px-4 text-center w-min-content">{IndonesianDate(val.tanggal)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    
    </div>
        
    </>
    );
    }
