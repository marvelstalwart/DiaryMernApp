import React from 'react'
import {ErrorMessage, useField } from 'formik'
import Email from '@mui/icons-material/EmailOutlined'
export default function EmailField({...props}) {
    const [field, meta]  = useField(props)
  return (
    <div>
      <div className='relative flex items-center '>
    <Email className='absolute text-gray-400 pointer-events-none'/>
    <input name='email'  className='w-full bg-transparent outline-0 h-10 p-2 pl-8 border-b-2 border-gray-400 focus:border-dark-purple' type='email' {...field} {...props}/> 
</div>
     <div className='text-red-500 text-sm'><ErrorMessage  name={field.name}/></div> 
    </div>
    

  ) 
}
