import { Mail } from "lucide-react"
import { cn } from "./utils"
import { User } from "../../types/types"

interface TeamMemberProps {
  member: User
  size?: "sm" | "md" | "lg"
  showContact?: boolean
}

const TeamMember = ({ member, size = "md", showContact = false }: TeamMemberProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className={cn("team-member", `size-${size}`)}>
      <div className="member-avatar">
       
          <div className="avatar-initials">{getInitials(member.userName)}</div>
      </div>
      <div className="member-info">
        <h4 className="member-name">{member.userName}</h4>
        <p className="member-role">{member.RoleName}</p>

        {showContact && (
          <div className="member-contact">
            {member.email && (
              <a href={`mailto:${member.email}`} className="contact-item">
                <Mail size={14} />
                <span>{member.email}</span>
              </a>
            )}
           
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamMember
