/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '../ui/button'

export const Header = () => {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src ='/logo.svg'/>
        <div>
           <Button> Sign in</Button>
        </div>
    </div>
  )
}
