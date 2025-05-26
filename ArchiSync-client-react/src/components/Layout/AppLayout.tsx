import {Outlet } from "react-router"
import Sidebar from "./Sidebar"
import "../../App.css"


const AppLayout= () => {
  return (<>
    <div className="layout-container">
      <div className="layout-content">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  </>)
}

export default AppLayout