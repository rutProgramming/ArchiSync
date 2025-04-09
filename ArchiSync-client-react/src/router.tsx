import { createBrowserRouter, Navigate } from 'react-router'
import Home from './components/home'
import AppLayout from './components/AppLayout'
import FileUploader from './components/FileUploader'
import ArchitectProjects from './components/ArchitectProjects'
import SideBar from './components/SideBar'
import ProjectDashboard from './components/ProjectDashboard'
import AddProject from './components/Addproject'
import UserProjects from './components/UserProjects'
import Workspace from './components/Workspace'
import { useSelector } from 'react-redux'
import { RootState } from './store/reduxStore'
import UserNotifications from './components/UserNotifications'
import ArchitectNotifications from './components/ArchitectNotifications'
import { ReactElement } from 'react'




const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const user = useSelector((state: RootState) => state.connect.user);
  if (user?.RoleName === "architect") {
    return element;
  }

  return null;
};


const ProtectedMessagesRoute = () => {
  const user = useSelector((state: RootState) => state.connect.user);
  return user.RoleName === "user" ? <UserNotifications /> : <ArchitectNotifications />;
};

export const router = createBrowserRouter(

  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: "home", element: <Home /> },

        {
          path: "sideBar",
          element: <SideBar />,
          children: [
            { path: "addProject", element: <ProtectedRoute element={<AddProject />} /> },
            { path: "myProjects", element: <ProtectedRoute element={<ArchitectProjects />} /> },
            { path: "myProjects/project/:projectId", element: <ProtectedRoute element={<ProjectDashboard />} /> },
            { path: "myProjects/project/:projectId/upload/:projectName", element: <ProtectedRoute element={<FileUploader />} /> },
            { path: "myProjects/project/:projectId/workSpace/:projectName", element: <ProtectedRoute element={<Workspace />} /> },
            { path: "messages", element: <ProtectedMessagesRoute /> },
          ]
        },

        { path: "projects", element: <UserProjects /> },
          { path: "projects/project/:projectId", element: <ProjectDashboard /> }
      ]
    },
  ]);

