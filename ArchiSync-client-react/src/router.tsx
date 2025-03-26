import { createBrowserRouter, Navigate } from 'react-router'
import Home from './components/home'
import AppLayout from './components/AppLayout'
import { useSelector } from 'react-redux'
import { RootState } from './store/reduxStore'
import { ReactElement } from 'react'
import FileUploader from './components/FileUploader'
import Projects from './components/Projects'
import ArchitectProjects from './components/ArchitectProjects'
import Addproject from './components/Addproject'
import { path } from 'framer-motion/client'
import SideBar from './components/SideBar'
import UserMessages from './components/UserNotifications'



const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const id = useSelector((state: RootState) => state.id);
  return id !== 0 ? element : null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "Home", element: <Home /> },
      // { path: "upload", element: <UploadWorkspace/> },

      {
        path: "sideBar", element: <SideBar />, children: [
          { path: "addProject", element: <Addproject /> },
          {
            path: "myProjects", element: <ArchitectProjects />, children: [
              { path: "upload/:parentId/:projectName", element: <FileUploader project={} /> },

            ]
          },
          { path: "Messages", element: <UserMessages /> },
        ]
      },

      { path: "/projects", element: <Projects /> },



      // {
      //   path: "/Recipes", element: <><Recipes /> </>,
      //   children: [{ path: "/Recipes/ShowRecipe/:id", element: <><ShowRecipe /></> }]
      // },
    ]
  }])

