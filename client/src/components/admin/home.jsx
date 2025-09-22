import React from 'react'
import Nav from './nav'

import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className='px-1 py-2'>
      <Nav />
     <Outlet />
    </div>
  )
}

export default Home
