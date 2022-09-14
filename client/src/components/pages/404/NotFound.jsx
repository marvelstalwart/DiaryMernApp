import React from 'react';
import error from '../../../assets/img/404.jpg'
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div>
        <img  className="w-screen max-h-screen " src={error}></img>
    <Link to="/"><div className='text-center cursor-pointer font-bold text-dark-purple'>Back to home</div></Link>
    </div>
  )
}
