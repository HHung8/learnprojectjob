
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Login from './components/auth/Login';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Companies from './components/admin/Companies';
import CompaniesCreate from './components/admin/CompaniesCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import JobDescription from './components/jobDescription';
import ProtectedRoute from './components/admin/ProtectedRoute';

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
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription/>
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Admin 
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompaniesCreate /></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs /></ProtectedRoute>
  }, 
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJobs /></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applications",
    element: <ProtectedRoute><Applicants /></ProtectedRoute> 
  }
])

function App() {
  return (
    <div>
         <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
