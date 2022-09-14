import React from 'react'
import {ErrorMessage, useField } from 'formik'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
export default function PasswordField({...props}) {
  const [field, meta]  = useField(props)
  return (
    <div>
      <div className='relative flex items-center'>
    <LockOutlinedIcon className='absolute text-gray-400 pointer-events-none'/>
    <input   name='password' className='w-full outline-0 mt-2 h-10 p-2 pl-8 border-b-2 border-gray-400 focus:border-dark-purple' {...field} {...props} autoComplete="off"/>
  
    </div>
    <div className='text-red-500 text-sm'><ErrorMessage  name={field.name}/></div> 
    </div>
    
  )
}
