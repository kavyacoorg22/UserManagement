import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/user/login'
import Home from './components/user/home'
import AdminLogin from './components/admin/login'

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
  <RouterProvider router={appRouter}/>
  </div>
  )
}

export default App;