/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Navbar () {
  return (
    <>
    
    <div className='flex flex-col items-center mx-12 gap-9'>
        <h1 className='font-extrabold text-[55px] text-center mt-16' >
            <span className='text-red-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .............................     </span>  <br />    Deserunt magnam corporis nobis facere quae rem ut at animi molestiae </h1>
            <p className='text-neutral-700 text-xl text-center'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi laborum quod voluptates, ipsum nisi doloribus</p>

            <Link to = {'/create_trip'}>
            <Button>START NOW </Button> 
            </Link>
    </div>
   
    </>
  )
}

export default Navbar