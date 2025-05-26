import { useState } from "react"
import { NavLink } from "react-router"
import { LayoutDashboard, MessageSquare, FolderKanban, Bot, ChevronLeft, ChevronRight } from "lucide-react"
import Logo from "../S/Logo"
import { cn } from "../S/utils"

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside className={cn("sidebar", collapsed && "collapsed")}>
      <div className="sidebar-header">
        <Logo collapsed={collapsed} />
        <button className="collapse-button" onClick={toggleSidebar}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => cn("nav-item", isActive && "active")}>
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/projects" className={({ isActive }) => cn("nav-item", isActive && "active")}>
          <FolderKanban size={20} />
          {!collapsed && <span>Projects</span>}
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) => cn("nav-item", isActive && "active")}>
          <MessageSquare size={20} />
          {!collapsed && <span>Messages</span>}
        </NavLink>

        <NavLink to="/ai-assistant" className={({ isActive }) => cn("nav-item", isActive && "active")}>
          <Bot size={20} />
          {!collapsed && <span>AI Assistant</span>}
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
