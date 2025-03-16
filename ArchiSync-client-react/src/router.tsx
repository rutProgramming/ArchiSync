import { createBrowserRouter, Navigate } from 'react-router'
import Home from './components/home'
import Recipes from './components/recipes'
import AppLayout from './components/AppLayout'
import ShowRecipe from './components/ShowRecipe'
import { useSelector } from 'react-redux'
import { RootState } from './store/reduxStore'
import { ReactElement } from 'react'
import FileUploader from './components/FileUploader'
import Projects from './components/Projects'
import UploadComponent from './components/UploadComponent'
import UploadWorkspace from './components/UploadComponent'


const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const id = useSelector((state: RootState) => state.id);
  return id !== 0 ? element : null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> }, // הפניה אוטומטית ל-Home
      { path: "Home", element: <Home /> },
      { path: "upload", element: <UploadWorkspace/> },
      {path:"/projects", element:<Projects /> }


      // {
      //   path: "/Recipes", element: <><Recipes /> </>,
      //   children: [{ path: "/Recipes/ShowRecipe/:id", element: <><ShowRecipe /></> }]
      // },
    ]
  }])

