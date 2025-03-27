import { createBrowserRouter, Navigate } from 'react-router'
import Home from './components/home'
import AppLayout from './components/AppLayout'
import FileUploader from './components/FileUploader'
import ArchitectProjects from './components/ArchitectProjects'
import SideBar from './components/SideBar'
import UserMessages from './components/UserNotifications'
import ProjectDashboard from './components/ProjectDashboard'
import AddProject from './components/Addproject'
import UserProjects from './components/UserProjects'
import Workspace from './components/Workspace'



// const ProtectedRoute = ({ element }: { element: ReactElement }) => {
//   const id = useSelector((state: RootState) => state.id);
//   return id !== 0 ? element : null;
// };

export const router = createBrowserRouter([
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
          { path: "addProject", element: <AddProject /> },
          {path: "myProjects",element: <ArchitectProjects />},
          { path: "myProjects/project/:projectId", element: <ProjectDashboard /> },
          { path: "myProjects/project/:projectId/upload/:projectName", element: <FileUploader /> },
          { path: "myProjects/project/:projectId/workSpace/:projectName", element: <Workspace /> },

          { path: "messages", element: <UserMessages /> },
        ]
      },

      { path: "projects", element: <UserProjects /> }
    ]
  }
]);

