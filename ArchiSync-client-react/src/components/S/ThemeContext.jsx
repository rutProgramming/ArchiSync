
import { createContext, useState, useContext } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("light-mode")
  }

  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}
