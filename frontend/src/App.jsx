import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/user/login'
import Home from './components/user/home'
import AdminLogin from './components/admin/login'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App=()=>{

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/home",
    element:<Home/>
  },
  {
    path:'/login',
    element:<AdminLogin/>
  }
])
  return(
  <div className='	bg-gray-900'>
    <ToastContainer position="top-right" autoClose={3000} />
  <RouterProvider router={appRouter}/>
  </div>
  )
}

export default App;