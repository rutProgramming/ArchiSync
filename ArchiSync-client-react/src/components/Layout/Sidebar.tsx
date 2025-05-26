
import {  useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { LayoutDashboard, MessageSquare, FolderKanban, Bot, LogOut, Menu, X, User, Settings } from "lucide-react"
import Logo from "../S/Logo"
import "./Sidebar.css"
import { AppDispatch, RootState } from "../../store/reduxStore"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../store/Connect"

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  }
  

  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/messages", name: "Messages", icon: <MessageSquare size={20} /> },
    { path: "/projects", name: "Projects", icon: <FolderKanban size={20} /> },
    { path: "/ai-assistant", name: "AI Assistant", icon: <Bot size={20} /> },
  ]
const dispatch:AppDispatch = useDispatch()
const user=useSelector((state:RootState)=>state.connect.user)
  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMobileSidebar}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <Logo collapsed={collapsed} />
          <button className="collapse-btn" onClick={toggleSidebar}>
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
                  <span className="icon">{item.icon}</span>
                  {!collapsed && <span className="text">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            {!collapsed && (
              <div className="user-info">
                <div className="avatar">
                  <User size={16} />
                </div>
                <div className="user-details">
                  <p className="user-name">{user.userName}</p>
                  <p className="user-role">{user.RoleName}</p>
                </div>
              </div>
            )}

            <div className="footer-actions">
              {collapsed ? (
                <>
                  <button className="icon-btn tooltip" data-tooltip="Settings">
                    <Settings size={20} />
                  </button>
                  <button className="icon-btn tooltip" data-tooltip="Logout" onClick={handleLogout}>
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button className="footer-btn">
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="footer-btn"onClick={handleLogout}>
                    <LogOut size={16}  />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
