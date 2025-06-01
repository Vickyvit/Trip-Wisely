// import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from '../src/components/custom/Navbar'
import { Header } from "./components/custom/Header"
import { Toaster } from 'sonner';
// import ChatGPTPlanner from './Chatgpt/ChatGPTPlanner';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
   <Navbar/>
   <Toaster/>
    <Outlet />
    {/* <ChatGPTPlanner/> */}
    </>
  )
}

export default App
