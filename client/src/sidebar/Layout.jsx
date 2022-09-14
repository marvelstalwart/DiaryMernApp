import React from 'react'
import Sidebar from './Sidebar';
import {Outlet, useLocation} from 'react-router-dom'

export default function Layout({hideHeaderPaths=[]}) {
  const {pathname } = useLocation();
    return (
    <>
    {!hideHeaderPaths.includes(pathname) && <Sidebar/>}
    <Outlet/>    
    </>
  )
}
