import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import entryService from "./entryService";
import moment from "moment/moment";
import * as yup from 'yup';
const initialState= {
    entries:[],
    todayEntries:[],
    yesterdayEntries:[],
    twoDaysOld:[],
    thisWeek:[],
    lastWeek:[],
    thisMonth:[],
    lastMonth:[],
    earlier:[],
    folder: "All",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}
let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),


})
//Validation
export const validate = (payload)=> {
   schema.isValid({
    email:payload.email,
    password: payload.password
   }).then((valid)=> {
    console.log(valid)
   }). catch((invalid)=> {
    console.log("Error",invalid)
   })
    
}
//Create new entry
export const createEntry = createAsyncThunk('entries/create',
async (payload, thunkAPI)=> {
        const token = thunkAPI.getState().auth.user.token
    try {
        return await entryService.createEntry(payload, token)
    }
    catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)||
        err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const getEntries = createAsyncThunk('entries/get', async(_, thunkAPI)=> {

    try {
        const token = thunkAPI.getState().auth.user.token
                return await entryService.getEntries(token)

    } catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)||
        err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const editEntry = createAsyncThunk('entries/edit', async (payload, thunkAPI)=> {
    try { 
        const token = thunkAPI.getState().auth.user.token
        console.log(token)
        return await entryService.editEntry(payload, token)
    
    }
    catch (err) {
        const message = (err.response && err.response.data && err.response.data.message)||
        err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }

})
export const deleteEntry = createAsyncThunk('entries/delete', async(id, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await entryService.deleteEntry(id, token)
    }

    catch(err) {
        const message = (err.response && err.response.data && err.response.data.message)||
        err.message || err.toString();
        return thunkAPI.rejectWithValue(message)
    }
})
    

const now = moment();

export const entrySlice = createSlice ({
    name: 'entry',
    initialState,
    reducers: {
        reset: (state)=>{
            state.entries = []
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        life: (state)=> {
            
            state.todayEntries = state.entries.filter(entry=> entry.category==="Life" && moment(new Date(entry.updatedAt).toDateString()).diff(now, 'days') ===0)
            state.yesterdayEntries = state.entries.filter(entry=> entry.category==="Life" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===1)
            state.twoDaysOld = state.entries.filter(entry=> entry.category==="Life" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===2)
            state.thisWeek = state.entries.filter(entry=> entry.category==="Life" && moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'week') ===true)
            state.lastWeek = state.entries.filter(entry=> entry.category==="Life" &&  now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===7)
            state.thisMonth = state.entries.filter(entry=> entry.category==="Life" && moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'month') ===true)
            state.lastMonth = state.entries.filter(entry=> entry.category==="Life" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===30)
            state.earlier = state.entries.filter(entry=> entry.category==="Life" &&now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') > 30)
            state.folder= "LIFE";
            
        },
        work: (state)=> {
            state.todayEntries = state.entries.filter(entry=> entry.category==="Work" && moment(new Date(entry.updatedAt).toDateString()).diff(now, 'days') ===0)
            state.yesterdayEntries = state.entries.filter(entry=> entry.category==="Work" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===1)
            state.twoDaysOld = state.entries.filter(entry=> entry.category==="Work" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===2)
            state.thisWeek = state.entries.filter(entry=> entry.category==="Work" && moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'week') ===true)
            state.lastWeek = state.entries.filter(entry=> entry.category==="Work" &&  now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===7)
            state.thisMonth = state.entries.filter(entry=> entry.category==="Work" && moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'month') ===true)
            state.lastMonth = state.entries.filter(entry=> entry.category==="Work" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===30)
            state.earlier = state.entries.filter(entry=> entry.category==="Work" &&now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') > 30)
            state.folder= "WORK";
            
            
        },
        school: (state)=> {
            state.todayEntries = state.entries.filter(entry=> entry.category==="School" && moment(new Date(entry.updatedAt).toDateString()).diff(now, 'days') ===0)
            state.yesterdayEntries = state.entries.filter(entry=> entry.category==="School" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===1)
            state.twoDaysOld = state.entries.filter(entry=> entry.category==="School" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===2)
            state.thisWeek = state.entries.filter(entry=> entry.category==="School" && moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'week') ===true)
            state.lastWeek = state.entries.filter(entry=> entry.category==="School" &&  now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===7)
            state.thisMonth = state.entries.filter(entry=> entry.category==="School" && moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'month') ===true)
            state.lastMonth = state.entries.filter(entry=> entry.category==="School" && now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') ===30)
            state.earlier = state.entries.filter(entry=> entry.category==="School" &&now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days') > 30)
            state.folder= "SCHOOL";
            
        }

    },
    extraReducers: (builder)=> {
        builder
        .addCase(createEntry.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(createEntry.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            state.entries.push(action.payload)
        })
        .addCase(createEntry.rejected, (state, action)=> {
            state.isLoading= false
            state.isError = true
            state.message = (action.payload)
        })
        
        .addCase(getEntries.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getEntries.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            state.entries=action.payload
                
                    //Get today's entries
                        //  const now  = moment()
                        //  state.entries.map((entry)=> {
                        //     const diff = now.diff(moment(new Date(entry.updatedAt).toDateString()), 'days')
                        //     console.log(diff)
                        //  })
                    state.todayEntries = state.entries.filter(entry =>  moment(new Date(entry.createdAt).toDateString()).diff(now, 'days') ===0)  
                    state.todayEntries = state.todayEntries.sort((a, b)=> console.log(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))       
                    state.yesterdayEntries = state.entries.filter(entry =>  now.diff(moment(new Date(entry.createdAt).toDateString()), 'days') ===1)         
                    state.twoDaysOld = state.entries.filter(entry =>  now.diff(moment(new Date(entry.createdAt).toDateString()), 'days') ===2)         
                    state.thisWeek = state.entries.filter(entry =>  moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'week') ===true)         
                    state.lastWeek = state.entries.filter(entry =>  now.diff(moment(new Date(entry.createdAt).toDateString()), 'days') ===7)         
                    state.thisMonth = state.entries.filter(entry =>  moment(new Date(entry.updatedAt).toDateString()).isSame(now, 'month') ===true) 
                    state.lastMonth = state.entries.filter(entry =>  now.diff(moment(new Date(entry.createdAt).toDateString()), 'days') ===30)         
                    state.earlier = state.entries.filter(entry =>  now.diff(moment(new Date(entry.createdAt).toDateString()), 'days') > 30)         
                
        })

        .addCase(getEntries.rejected, (state, action)=> {
            state.isLoading= false
            state.isError = true
            state.message = (action.payload)
        })
        
        .addCase(editEntry.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(editEntry.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            // state.entries=action.payload
        })
        .addCase(editEntry.rejected, (state, action)=> {
            state.isLoading= false
            state.isError = true
            state.message = (action.payload)
        })
        .addCase(deleteEntry.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(deleteEntry.fulfilled, (state, action)=> {
            state.isLoading= false
            state.isSuccess = true
            state.entries=state.entries.filter((entry)=> entry._id !== action.payload.id)
        })
        .addCase(deleteEntry.rejected, (state, action)=> {
            state.isLoading= false
            state.isError = true
            state.message = (action.payload)
        })
        


    }
})

export const {reset, life, work, school, search} = entrySlice.actions
export default entrySlice.reducer