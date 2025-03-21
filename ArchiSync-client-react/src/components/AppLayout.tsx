import { Outlet } from "react-router"
import NavBar from "./NavBar"

const AppLayout = () => {
    return (<>
        <NavBar></NavBar>
        <main>
          <Outlet /> 
        </main>
    </>)
}

export default AppLayout