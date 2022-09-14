import React from 'react'
import { Link } from 'react-router-dom'
import diary from '../../client/src/assets/img/diary.png'
export default function Welcome() {
  return (
    <body className='bg-dark-purple h-screen w-screen m-0 p-0'>
    <div className='  h-full w-full relative flex flex-col justify-between'>
<div className='text-white text-large p-4 font-medium'><h1>DIARY</h1></div>


<div className='w-full flex justify-center'><img src={diary} className=' justify-center '/></div>

<div className=' '>


<div className=' animate-fadeIn  mx-auto text-white block w-4/5 md:w-[50%]' >

    <div>
<h1 className=' duration-200 text-4xl font-medium mb-2'>
    My Diary
</h1>

    <p className='text-lg text-gray-300  pb-4 mb-6'>Secure a safe space for yourself on the web. Reel your thoughts; exclusively for you.</p>
<div className='flex flex-col'>
   <Link to='/sign-in'><button className='w-full rounded-md bg-white p-2 mb-2 font-bold text-dark-purple hover:bg-gray-200'>Log in</button></Link> 
   <Link to='/sign-up'> <button className='w-full rounded-md bg-none p-2 mb-2 font-bold border-2 text-white hover:text-gray-300'>Sign up</button></Link>
</div>
</div>
</div>    
</div>

</div>
</body>
  )
}
