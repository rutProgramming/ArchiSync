
// import { useState, useEffect } from "react"
// import { Link } from "react-router"
// import { BarChart3, Users, Building, Clock, Plus, ArrowRight } from "lucide-react"
// import "./Dashboard.css"
// import "./Projects/Projects"

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     activeProjects: 0,
//     completedProjects: 0,
//     teamMembers: 0,
//     messages: 0,
//   })

//   const [recentProjects, setRecentProjects] = useState([])
//   const [recentMessages, setRecentMessages] = useState([])

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setStats({
//         activeProjects: 12,
//         completedProjects: 24,
//         teamMembers: 8,
//         messages: 16,
//       })

//       setRecentProjects([
//         { id: 1, name: "בית פרטי", image: "/placeholder.svg?height=200&width=300", progress: 75, client: "דוד כהן" },
//         {
//           id: 2,
//           name: "מגדל משרדים",
//           image: "/placeholder.svg?height=200&width=300",
//           progress: 30,
//           client: "חברת אלפא",
//         },
//         { id: 3, name: "פארק", image: "/placeholder.svg?height=200&width=300", progress: 90, client: "עיריית תל אביב" },
//       ])

//       setRecentMessages([
//         { id: 1, sender: "JD", name: "John Doe", message: "What's the status of our project?", time: "2h ago" },
//         { id: 2, sender: "ER", name: "Emma R", message: "Can you provide the revised plans?", time: "5h ago" },
//         { id: 3, sender: "AS", name: "Alice Smith", message: "Great, thanks!", time: "1d ago" },
//       ])
//     }, 500)
//   }, [])

//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h1>Dashboard</h1>
//         <Link to="/projects/new" className="new-project-btn">
//           <Plus size={16} />
//           <span>New Project</span>
//         </Link>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon">
//             <Building size={24} />
//           </div>
//           <div className="stat-content">
//             <h3>{stats.activeProjects}</h3>
//             <p>Active Projects</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon">
//             <Clock size={24} />
//           </div>
//           <div className="stat-content">
//             <h3>{stats.completedProjects}</h3>
//             <p>Completed Projects</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon">
//             <Users size={24} />
//           </div>
//           <div className="stat-content">
//             <h3>{stats.teamMembers}</h3>
//             <p>Team Members</p>
//           </div>
//         </div>

//         <div className="stat-card">
//           <div className="stat-icon">
//             <BarChart3 size={24} />
//           </div>
//           <div className="stat-content">
//             <h3>{stats.messages}</h3>
//             <p>New Messages</p>
//           </div>
//         </div>
//       </div>

//       <div className="dashboard-content">
//         <div className="recent-projects">
//           <div className="section-header">
//             <h2>Recent Projects</h2>
//             <Link to="/projects" className="view-all">
//               View All <ArrowRight size={16} />
//             </Link>
//           </div>

//           <div className="projects-grid">
//             {recentProjects.map((project) => (
//               <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
//                 <div className="project-image">
//                   <img src={project.image || "/placeholder.svg"} alt={project.name} />
//                   <div className="project-progress">
//                     <div className="progress-bar">
//                       <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
//                     </div>
//                     <span>{project.progress}%</span>
//                   </div>
//                 </div>
//                 <div className="project-info">
//                   <h3 className="project-title">{project.name}</h3>
//                   <p className="project-client">Client: {project.client}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className="recent-messages">
//           <div className="section-header">
//             <h2>Recent Messages</h2>
//             <Link to="/messages" className="view-all">
//               View All <ArrowRight size={16} />
//             </Link>
//           </div>

//           <div className="messages-list">
//             {recentMessages.map((message) => (
//               <Link to="/messages" key={message.id} className="message-card">
//                 <div className="message-avatar">{message.sender}</div>
//                 <div className="message-content">
//                   <div className="message-header">
//                     <h4>{message.name}</h4>
//                     <span className="message-time">{message.time}</span>
//                   </div>
//                   <p className="message-text">{message.message}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard
