import React, {useState, useEffect} from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { createEntry, editEntry } from '../../../features/entries/entrySlice';
import {toast} from "react-toastify";
import Update from '@mui/icons-material/Update';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import Create from '@mui/icons-material/Create';
export default function NewEntry() {
    const {quill, quillRef} = useQuill();
    let dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();
    const {user} = useSelector((state)=> state.auth)
    const {isError, isLoading, isSuccess, message} =useSelector((state)=> state.entries)
    const previous= location.state;
    const [quillLength, setquillLength] = useState(1)
    const [payload, setPayload] = useState({
      title: "",
      content:"",
      category:"uncategorized",
      id: user._id
    })
    let schema = yup.object().shape(   
      {   title: yup.string().required() }
      
    )
  
    const [content, setContent] = useState("");
    
    const handleChange = (e) => {
      const {name, value} = e.target;
      setPayload({...payload, [name]: value})
      console.log(payload)
    }
    // quill, payload, isError, isLoading, isSuccess
    useEffect(()=> {
      if (quill  && previous && previous.note && payload.content=="") {
         console.log(payload.content)
        quill.clipboard.dangerouslyPasteHTML(`${previous.note.content}`);
        setPayload({...payload, title: previous.note.title, 
          content: previous.note.content, category: previous.note.category, postId: previous.note._id})
          console.log(payload)
      }

      if (quill) {
        quill.on('text-change', (delta, oldDelta, source) => { 
         setPayload({...payload, content: quill.root.innerHTML})
         setquillLength(quill.getLength());
        });
      }
      if (isError) {
        toast.error(message)
      }
      


      

    },[quill,isError, isLoading, isSuccess, content, payload, payload.content])

   
    // const onSubmit = (e)=> {
    //   e.preventDefault()
    //   if (previous && previous.note) {
    //     console.log(payload)
    //      dispatch(editEntry(payload))
    //      const note = payload
    //       navigate(`/entry/${payload.postId}`, {
    //         state:{note}
    //       })
        
    //   }
    //   else {
        
    //    dispatch(createEntry(payload))
    //    if(isSuccess) {
    //     navigate('/')
    //   }
    //   }
    // }
  return ( 
    <body className='h-screen w-screen justify-center bg-blue-100 pt-10 overflow-y-auto'>
      
       <Formik
       initialValues={payload}
        validationSchema={schema}
        onChange={handleChange}
        onSubmit={(values)=> {
          if (previous && previous.note) {

            let newContent =  payload.content
            
             dispatch(editEntry({title: values.title, content: payload.content, category: values.category
             , id: values.id, postId: payload.postId
            }))
             const note = values
             

              navigate(`/entry/${payload.postId}`, {
                state:{note, newContent},
                
              })
            
          }
          else {
            
           dispatch(createEntry({title: values.title, content: payload.content, category: values.category
            , id: values.id}))
           
            navigate('/entries')
          
          }
        }}
       >
        {formik=> (
          <Form onSubmit={formik.handleSubmit}>
                  <div className='flex  flex-col items-end'>
   
   <button  disabled={quillLength === 0 ||quillLength===1} type='submit' className={`p-1 px-2 mt-2 my-1 rounded-lg ${quillLength ===0 || quillLength ===1 ||formik.errors && formik.errors.title ? 'cursor-not-allowed text-gray-600': 'text-dark-blue '} text-[13px] font-bold`}>{
   isLoading?
     <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
     :

   previous && previous.note && previous.note.title? <div><Update fontSize='small'/>Update</div>: <div><Create fontSize='small'/>Create</div>
   
   }</button>
 </div>
<div className='bg-white w-full rounded-3xl'>

                    <div className='p-2 h-100 '>
          {/* <div><h1 className=' text-2xl font-bold text-dark-purple '>Share Your Thoughts...</h1></div> */}
        <input onChange={formik.handleChange} defaultValue={previous && previous.note && previous.note.title? `${previous.note.title}` : ``} name="title" className="outline-0 my-4 bg-white border-b-2 p-2 w-full rounded-md" type="text" placeholder='Title goes here... '/>
       {console.log(formik.errors)}
              <div className='bg-white border-2 rounded-md w-full '>
          <div>
              <div className='bg-white min-h-40 ' ref={quillRef}/>
          </div>
        
          </div>
        
        <div className='mt-2 '>
          <select  onChange={formik.handleChange} defaultValue={previous && previous.note && previous.note.category? `${previous.note.category}` : ``} className='p-2 border-0 bg-gray-100 rounded-md' name="category" value={payload.value}>
              <option className='py-4 border-0 outline-0' value="Uncategorized">Uncategorized</option>
              <option value="Life">Life</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
          </select>
        </div>
    
    </div>
    </div>
          </Form>
        )}

       </Formik>
     
   
    </body>
   
  )
}
