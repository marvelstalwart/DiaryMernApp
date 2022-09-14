import React from 'react'

export default function Note({note}) {
 
  return (
    <div className=' my-2 w-100  text-gray-700 text-left text-sm p-2 cursor-pointer h-auto leading-4 bg-white  rounded-md'>
    <h1 className='font-medium text-lg'>{note.title}</h1>
    <div className='flex'>
    <p className='leading-3 flex-1 font-medium text-gray-500 '> <div dangerouslySetInnerHTML={{__html: note && note.content && note.content.slice(0, 160) }}/></p>
   {/* <div className='text-[9px] -rotate-90 w-30'><h1 className='font-medium '>{new Date(note.createdAt).toLocaleDateString('en-US')}</h1><p className=''>{new Date(note.createdAt).toLocaleTimeString('en-US')}</p></div> */}
    </div>
   
</div> 
  )
}
