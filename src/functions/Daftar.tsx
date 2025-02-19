import axios from "axios";
import { ENDPOINT_URL } from '@/config/config';

axios.defaults.baseURL = ENDPOINT_URL;


const addDaftar = async(type: any, typeId: any) => {
    const uid = JSON.parse(localStorage.getItem('userData')as any) 
    const res = await axios.post(`${ENDPOINT_URL}/daftar/create`, {
        id_user: uid.id,
        id_event: type==='Event' ? typeId : null,  
        id_beasiswa: type==='Beasiswa' ? typeId : null,
        id_lowongan: type==='Lowongan' ? typeId : null,
    },{
        withCredentials: true
    })
    return res.data
}

const getDaftar = async() => {
    const uid = JSON.parse(localStorage.getItem('userData') as any)
    const res = await axios.get(`${ENDPOINT_URL}/daftar/query/${uid?.id}`, 
    {
        withCredentials: true
    })
    return res.data
}

const checkDaftar = async(id: any, type: any) => {
    const uid = JSON.parse(localStorage.getItem('userData')as any) 
    const res = await axios.post(`${ENDPOINT_URL}/daftar/check`, {
        id_user: uid.id,
        id_event: type==='Event' ? id : null,  
        id_beasiswa: type==='Beasiswa' ? id : null,
        id_lowongan: type==='Lowongan' ? id : null,
    },{
        withCredentials: true
    })
    return res.data
}

const deleteByRefDaftar = async(id: any, type: any) => {
    const uid = JSON.parse(localStorage.getItem('userData')as any) 
    const res = await axios.post(`${ENDPOINT_URL}/daftar/deleteRef`, {
        id_user: uid.id,
        id_event: type==='Event' ? id : null,  
        id_beasiswa: type==='Beasiswa' ? id : null,
        id_lowongan: type==='Lowongan' ? id : null,
    },{
        withCredentials: true
    })
    return res.data
}

export { addDaftar, getDaftar, checkDaftar, deleteByRefDaftar }