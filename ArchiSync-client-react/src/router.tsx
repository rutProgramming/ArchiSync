import { createBrowserRouter, Navigate } from 'react-router'
import AppLayout from './components/Layout/AppLayout'
import { useSelector } from 'react-redux'
import { RootState } from './store/reduxStore'
import HomePage from './components/Home/HomePage'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import NewProject from './components/Projects/NewProject'
import ProjectDetail from './components/Projects/ProjectDetail'
import AIAssistant from './components/Ai/AIAssistant.tsx'
import Messages from './components/Messages/Messages.tsx'
import AllProjects from './components/Projects/AllProjects.tsx'
import Projects from './components/Projects/Projects.tsx'



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.connect.user)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const RootElement = () => {
  const user = useSelector((state: RootState) => state.connect.user)
  return user.token ? <AppLayout /> : <HomePage />
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
          element: <Navigate to="/projects" replace />
        },
        {
          path: "MyProjects",
          element: (
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          )
        },
        {
          path: "MyProjects/:id",
          element: (
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          )
        },

      {
          path: "projects",
          element: (
            <ProtectedRoute>
              <AllProjects />
            </ProtectedRoute>
          )
        },
        {
          path: "new",
          element: (
            <ProtectedRoute>
              <NewProject />
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

        {
          path: "messages",
          element: (
            <ProtectedRoute>
              <Messages />
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

