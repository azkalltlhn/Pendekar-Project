import axios from "axios";
import { ENDPOINT_URL } from '@/config/config';

axios.defaults.baseURL = ENDPOINT_URL;


const addBookmark = async(type: any, typeId: any) => {
    const uid = JSON.parse(localStorage.getItem('userData')as any) 
    const res = await axios.post(`${ENDPOINT_URL}/markah/create`, {
        id_user: uid.id,
        id_event: type==='Event' ? typeId : null,  
        id_beasiswa: type==='Beasiswa' ? typeId : null,
        id_lowongan: type==='Lowongan' ? typeId : null,
    },{
        withCredentials: true
    })
    return res.data
}

const getBookmark = async() => {
    const uid = JSON.parse(localStorage.getItem('userData') as any)
    const res = await axios.get(`${ENDPOINT_URL}/markah/query/${uid?.id}`, 
    {
        withCredentials: true
    })
    return res.data
}

const deleteBookmark = async(id: any) => {
    const res = await axios.delete(`${ENDPOINT_URL}/markah/delete/${id}`,
    {
        withCredentials: true
    })
    return res.data
}

const checkExist = async(id: any, type: any) => {
    const uid = JSON.parse(localStorage.getItem('userData')as any) 
    const res = await axios.post(`${ENDPOINT_URL}/markah/check`, {
        id_user: uid.id,
        id_event: type==='Event' ? id : null,  
        id_beasiswa: type==='Beasiswa' ? id : null,
        id_lowongan: type==='Lowongan' ? id : null,
    },{
        withCredentials: true
    })
    return res.data
}

const deleteByRef = async(id: any, type: any) => {
    const uid = JSON.parse(localStorage.getItem('userData')as any) 
    const res = await axios.post(`${ENDPOINT_URL}/markah/deleteRef`, {
        id_user: uid.id,
        id_event: type==='Event' ? id : null,  
        id_beasiswa: type==='Beasiswa' ? id : null,
        id_lowongan: type==='Lowongan' ? id : null,
    },{
        withCredentials: true
    })
    return res.data
}

export { addBookmark, getBookmark, deleteBookmark, checkExist, deleteByRef }