import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from './components/Layout/AppLayout'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import { useSelector } from 'react-redux'
import { RootState } from './store/reduxStore'
import HomePage from './components/Home/HomePage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import Projects from './components/Projects/Projects'
import NewProject from './components/Projects/NewProject'
import ProjectDetail from './components/Projects/ProjectDetail'
import AIAssistant from './components/Ai/AIAssistant.tsx'
import UserMessages from './components/Messages/UserNotifications.tsx'
import ArchitectMessages from './components/Messages/ArchitectNotifications.tsx'
import UserProjects from './components/Projects/UserProjects.tsx'




// const ProtectedMessagesRoute = () => {
//   const user = useSelector((state: RootState) => state.connect.user);
//   return user.RoleName === "user" ? <UserNotifications /> : <ArchitectNotifications />;
// };
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.connect.user)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const RootElement = () => {
  const user = useSelector((state: RootState) => state.connect.user)
  console.log("RootElement user:", user.RoleName);
  
  return user.RoleName ? <AppLayout /> : <HomePage />
}

const ProjectsElement = () => {
  const user = useSelector((state: RootState) => state.connect.user)
  if (!user?.token) return <Navigate to="/login" replace />
  return user.RoleName === "user" ? <UserProjects /> : <Projects />
}

const MessageElement = () => {
  const user = useSelector((state: RootState) => state.connect.user)
  if (!user || !user.RoleName) {
    return <Navigate to="/login" replace />
  }
  if (user.RoleName === "user") {
    return <UserMessages />
  } else if (user.RoleName === "architect") {
    return <ArchitectMessages />
  }
}
export const router = createBrowserRouter(

  [
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootElement />
      </ProtectedRoute>
    ),
    children: [
       {
      index: true,
      element: <Navigate to="/dashboard" replace />
    },
      { path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      { path: "projects",
        element: (
          <ProtectedRoute>
          <ProjectsElement />
        </ProtectedRoute>
      )
    },
    {
      path: "new",
      element: (
        <ProtectedRoute>
            <NewProject/>
        </ProtectedRoute>
      )
    },
    {
      path: "projects/:id",
      element: (
        <ProtectedRoute>
            <ProjectDetail />
        </ProtectedRoute>
      )
    },

    { path: "messages",
      element: (
        <ProtectedRoute>
            <MessageElement />
        </ProtectedRoute>
      )
    },
    {
      path: "ai-assistant",
      element: (
        <ProtectedRoute>
            <AIAssistant />
        </ProtectedRoute>
      )
    },
    { path: "*", element: <Navigate to="/" replace /> }
    ]
    }
  ]
);

