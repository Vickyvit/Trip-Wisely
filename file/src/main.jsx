import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTrip } from './Create_trip/index.jsx'
import { Toaster } from './components/ui/toaster'
// import { Header } from './components/custom/Header'
// import Navbar from './components/custom/Navbar'

const router= createBrowserRouter([
  {
    path:'/',
    element:<App />
  },{
    path:'/create_trip',
    element:<CreateTrip/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Toaster/>
  
    <RouterProvider router={router}/>
  </StrictMode>,
)
