import { cn } from "./utils"

interface LogoProps {
  collapsed?: boolean
}

const Logo = ({ collapsed = false }: LogoProps) => {
  return (
    <div className={cn("logo", collapsed && "collapsed")}>
      <div className="logo-icon">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2L26 9V19L14 26L2 19V9L14 2Z" stroke="#d4a19a" strokeWidth="2" fill="none" />
          <path d="M14 8L20 11.5V18.5L14 22L8 18.5V11.5L14 8Z" fill="#d4a19a" />
        </svg>
      </div>
      {!collapsed && <span className="logo-text">ArchiSync</span>}
    </div>
  )
}

export default Logo
