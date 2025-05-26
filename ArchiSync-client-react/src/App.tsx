// import './App.css'
// import { Provider } from 'react-redux'
// import store from './store/reduxStore'
// import { RouterProvider } from 'react-router'
// import { router } from './router'
// import { Box } from '@mui/material'


// function App() {
//   return (
//     <>
//     <Box
    
//      >
//       <Provider store={store}>
//         <RouterProvider router={router} ></RouterProvider>
//         </Provider>
//       </Box>
  
//     </>
//   )
// }

// export default App

// import type React from "react"

import { ThemeProvider } from "./components/S/theme-provider"
// import NotificationPanel from "./components/NotificationPanel"
// import Sidebar from "./components/Sidebar"
// import { useState } from "react"
import "./App.css"
import { Provider } from "react-redux"
import store from "./store/reduxStore"
import { router } from "./router"
import { RouterProvider } from "react-router"
import { Toaster } from "react-hot-toast";

// const sampleNotifications = [
//   {
//     id: "1",
//     title: "New Comment",
//     message: "John Smith commented on Modern Residence project",
//     type: "info" as const,
//     timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
//     read: false,
//   },
//   {
//     id: "2",
//     title: "Deadline Approaching",
//     message: "Project submission deadline in 2 days",
//     type: "warning" as const,
//     timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
//     read: false,
//   },
//   {
//     id: "3",
//     title: "Project Approved",
//     message: "Downtown Tower project has been approved",
//     type: "success" as const,
//     timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
//     read: true,
//   },
// ]

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = useSelector((state: RootState) => state.connect.user)
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }
//   return <>{children}</>
// }

// const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
//   const [notifications, setNotifications] = useState(sampleNotifications)

//   const handleMarkAsRead = (id: string) => {
//     setNotifications(
//       notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
//     )
//   }

//   const handleClearAll = () => {
//     setNotifications([])
//   }

//   return (
//     <div className="app-container">
//       <Sidebar />
//       <main className="main-content">
//         <div className="top-bar">
//           <div className="top-bar-right">
//             <NotificationPanel
//               notifications={notifications}
//               onMarkAsRead={handleMarkAsRead}
//               onClearAll={handleClearAll}
//             />
//           </div>
//         </div>
//         {children}
//       </main>
//     </div>
//   )
// }

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster />
    </ThemeProvider>

  )
}

export default App
