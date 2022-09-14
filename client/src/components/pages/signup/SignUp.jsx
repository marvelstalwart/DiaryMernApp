import React, {useState, useEffect} from 'react'
import { Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Before from '@mui/icons-material/NavigateBefore'
import * as yup from 'yup'
import { Formik, Form, useField, ErrorMessage } from 'formik'
import Person from '@mui/icons-material/Person';
import {Link, useNavigate} from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify'
import { register, reset } from '../../../features/auth/authSlice';
export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email:"",
    password:"",
    confirmPassword:""
  })
  let schema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "Too short"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password  is required").min(6, "Weak"),
    confirmPassword: yup.string().required("Password does not match").oneOf([yup.ref('password'), null], "Passwords must match")

})
  let navigate = useNavigate();
  const dispatch  =useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)
  
  
useEffect(()=> {

  if (isError) {
    toast.error(message)
  }
  if (isSuccess ) {

    navigate('/sign-in')

  }
  dispatch(reset())

  


}, [ isError, isSuccess, message, navigate, dispatch])

  // const handleChange = (e) => {
  //   // const {name, value} = e.target;
  //   // setFormData({...formData, [name]: value})
  //   // console.log(formData)
  
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
   
  // }
  
  

  return (
    <body className='bg-dark-purple h-screen w-screen'>

   
    <div className='animate-fadeIn relative h-full w-full'>
        <Before onClick={()=> navigate(-1)} className='text-white cursor-pointer mt-4' fontSize='large'/>
        <p className='text-white font-medium text-4xl p-4 pt-6 md:pt-10 lg:pt-16 md: mx-20'>Create<br></br> Account</p>
       <div className='absolute bottom-0'>

       
       <svg xmlns="http://www.w3.org/2000/svg" className='block my-[-1px]' viewBox="0 0 1440 319"><path fill="#ffffff" fill-opacity="1" d="M0,160L40,186.7C80,213,160,267,240,261.3C320,256,400,192,480,181.3C560,171,640,213,720,245.3C800,277,880,299,960,298.7C1040,299,1120,277,1200,250.7C1280,224,1360,192,1400,176L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
   <div className=' bg-white block h-full  w-screen mt-0 p-4 pt-12 md:pt-0'>
   <div className='md:px-[20%] '>
  <Formik
  initialValues={formData}
  validationSchema={schema}
  
  onSubmit={(values)=> {
    
      const userData = {username: values.username,email: values.email, password: values.password}
      dispatch(register(userData))
    
  }}
 
  >
      {( {handleChange,handleSubmit, values, handleBlur, errors, touched})=> (
        <Form onSubmit={handleSubmit}>
             <div className='relative flex items-center '>
        <PersonIcon className='absolute text-gray-400 pointer-events-none'/>
        <input name='username' onChange={handleChange} onBlur={handleBlur} className={`w-full bg-transparent outline-0 h-10 p-2 pl-8 border-b-2 ${ touched&& touched.username && errors && errors.username? 'border-red-500' :'border-gray-400'} focus:border-dark-purple`} type='text' placeholder='Username' autoComplete='off'/>
    </div>
    
    <div className='text-red-500 text-[10px]'>
                {touched && touched.username &&errors.username}
                </div> 
  <br></br>

    <div className='relative flex items-center '>
        <EmailOutlinedIcon className='absolute text-gray-400 pointer-events-none'/>
        <input name='email' onBlur={handleBlur} onChange={handleChange} className={`w-full bg-transparent outline-0 h-10 p-2 pl-8 border-b-2 ${ touched &&touched.email && errors && errors.email? 'border-red-500' :'border-gray-400'} focus:border-dark-purple`} type='email' placeholder='Email' autoComplete='off'/>
    </div>
    <div className='text-red-500 text-[10px]'>
                {touched&& touched.email&&errors.email}
                </div> 

   <br/>
   <div className='relative flex items-center'>
   <LockOutlinedIcon className='absolute text-gray-400 pointer-events-none'/>
   <input   name='password' onChange={handleChange} onBlur={handleBlur} className={`w-full outline-0 mt-2 h-10 p-2 pl-8 border-b-2 ${touched && touched.password && errors && errors.password? 'border-red-500' :'border-gray-400'} focus:border-dark-purple`} type='password' placeholder='Password'  autoComplete='off'/>
 
   </div>
   <div className='text-red-500 text-[10px]'>
                {touched && touched.password && errors.password}
                </div> 
   <br/>
   <div className='relative flex items-center'>
   <LockOutlinedIcon className='absolute text-gray-400 pointer-events-none'/>
   <input  name='confirmPassword' onChange={handleChange}  onBlur={handleBlur} className={`w-full outline-0 mt-2 h-10 p-2 pl-8 border-b-2 ${touched && touched.confirmPassword && errors && errors.confirmPassword? 'border-red-500' :'border-gray-400'} focus:border-dark-purple`} type='password' placeholder='Confirm Password'  autoComplete='off'/>
 
   </div>
   <div className='text-red-500 text-[10px]'>
                {touched && touched.confirmPassword && errors.confirmPassword}
                </div> 
     <div className='flex flex-col items-end'><h1 className='text-lg font-bold text-[16px] text-dark-purple pb-4'>Forgot password?</h1></div>
   <button   disabled={errors.email||errors.password ||errors.confirmPassword } type="submit" className={` ${errors.email || errors.password || errors.confirmPassword ? 'bg-gray-300 cursor-not-allowed': 'bg-dark-purple'} text-white font-bold rounded-md p-4 w-full hover:bg-dark-purple-700`}>{isLoading ?
                    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              :
              <p>Sign up</p>
              }</button>
        </Form>
      )}

  </Formik>
  
   <div className='w-full flex items-center justify-center'> <div className='w-[20%] border-b-2 border-gray-400'></div><p className='text-gray-400 px-4'>or</p><div className='w-[20%] border-b-2 border-gray-400'></div></div>
   <Link to='/sign-in'><button type='submit'  className='bg-transparent border-2 border-gray-400 text-gray-400 font-bold rounded-md p-4 w-full'>Log in </button>
   </Link>
   </div>
       </div>
   </div>
    </div>
    </body>
  )
}
