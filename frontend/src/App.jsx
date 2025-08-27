
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Login from './components/auth/Login';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },

])

function App() {
  return (
    <div>
         <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
