import { cn } from "../S/utils"
import {
  BarChart3,
  Calendar,
  FileText,
  Folder,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react"
import { Logo1 } from "../S/Logo1"
import { Link } from "react-router"

export default function Sidebar() {
  const pathname = window.location.pathname
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/messages",
      active: pathname === "/messages",
    },
    {
      label: "Projects",
      icon: Folder,
      href: "/projects",
      active: pathname === "/projects",
    },
    {
      label: "AI Assistant",
      icon: Sparkles,
      href: "/assistant",
      active: pathname === "/assistant",
    },
    {
      label: "Team",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
    },
    {
      label: "Calendar",
      icon: Calendar,
      href: "/calendar",
      active: pathname === "/calendar",
    },
    {
      label: "Documents",
      icon: FileText,
      href: "/documents",
      active: pathname === "/documents",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
  ]

  return (
    <div className="flex h-screen flex-col border-r border-border bg-black">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link to={"/"} className="flex items-center gap-2 font-semibold">
          <Logo1 className="h-6 w-6 text-amber-400" />
          <span className="text-amber-400">ARCHEVA</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route, i) => (
            <Link
              key={i}
to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-amber-400",
                route.active ? "bg-secondary text-amber-400" : "text-muted-foreground",
              )}
            >
              <route.icon className={cn("h-4 w-4", route.active && "text-amber-400")} />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-border p-4">
        <div className="grid gap-1">
          <Link
            to="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-amber-400",
              pathname === "/settings" ? "bg-secondary text-amber-400" : "text-muted-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
