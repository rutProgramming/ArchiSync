import './App.css'
import { Provider } from 'react-redux'
import store from './store/reduxStore'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { Box } from '@mui/material'


function App() {
  return (
    <>
    <Box
    
     >
      <Provider store={store}>
        <RouterProvider router={router} ></RouterProvider>
        </Provider>
      </Box>
  
    </>
  )
}

export default App
