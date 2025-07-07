import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/user/login'
import Home from './components/user/home'

const App=()=>{

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/home",
    element:<Home/>
  }
])
  return(
  <div className='	bg-gray-900'>
  <RouterProvider router={appRouter}/>
  </div>
  )
}

export default App;