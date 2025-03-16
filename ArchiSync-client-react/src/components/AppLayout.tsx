import { Outlet } from "react-router"
import NavBar from "./NavBar"
import Profile from "./profile"
const AppLayout = () => {
    return (<>
        <NavBar></NavBar>
        <main>
          <Outlet /> 
        </main>
    </>)
}

export default AppLayout