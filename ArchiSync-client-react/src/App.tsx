import { ThemeProvider } from "./components/Additional/theme-provider"
import "./App.css"
import { Provider } from "react-redux"
import store from "./store/reduxStore"
import { router } from "./router"
import { RouterProvider } from "react-router"
import { Toaster } from "react-hot-toast";

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
