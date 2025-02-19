import { getJobById } from "@/functions/Jobs"
import { getBeasiswaById } from "@/functions/Scholarship"
import { createEffect, createSignal } from "solid-js"

const ItemLowongan = (props:any) =>{
    const [data, setData] = createSignal<any>({})
    createEffect(async()=>{
        const val = await getJobById(props.id_lowongan)
        setData(val)
    })
    return(
            <div>
                <div class="font-['DM Sans'] text-lg font-bold leading-[30px] text-blue-950">
                    {data().judul_lowongan}
                </div>

                <p>{data().role}</p>

                <p>{data().perusaahan}</p>

                <p>{data().lokasi}</p>
            </div>
            
    )
  }

  export default ItemLowongan