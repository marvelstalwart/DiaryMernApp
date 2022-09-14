import axios from "axios";
const ENTRY_URL = "https://mywebdiaries.herokuapp.com/entries/";


const createEntry = async (payload, token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
        const response = await axios.post(ENTRY_URL, payload ,config )
        return response.data
        
  
}

const getEntries = async(token)=> {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
        const response = await axios.get(ENTRY_URL, config)
        return response.data
    
   
}
const editEntry = async (payload, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
        console.log(payload.postId, config)
        const response = await axios.put(ENTRY_URL + `/${payload.postId}`,payload, config)
        return response.data
    
}
const deleteEntry = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(id)
        const response = await axios.delete(ENTRY_URL + `/${id}`, config)
        return response.data
    

}
const entryService = {
    createEntry,
    getEntries,
    editEntry,
    deleteEntry
}


export default entryService
