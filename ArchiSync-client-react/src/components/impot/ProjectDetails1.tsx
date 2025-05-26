// "use client";

// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router"; // שים לב: react-router או react-router-dom?
// import {
//   ArrowLeft,
//   Edit,
//   Trash,
//   Download,
//   Share,
//   Calendar,
//   MapPin,
//   Users,
//   Tag,
//   MessageSquare,
//   FileText,
//   ImageIcon,
//   Grid,
// } from "lucide-react";
// import "./ProjectDetails.css";
// import { ProjectDTO } from "../../types/Project";

// type Task = {
//   id: number;
//   title: string;
//   assignee: string;
//   dueDate: Date;
//   status: "completed" | "in-progress" | "pending" | string;
// };

// type Document = {
//   id: number;
//   name: string;
//   type: string;
//   size: number;
//   uploadedAt: Date;
//   url: string;
// };

// type ProjectDTOExtended = ProjectDTO & {
//   client?: string; // הוספתי לפי שימוש בקוד
//   images?: string[];
//   tasks: Task[];
//   documents: Document[];
//   architects: string[];
//   tags: string[];
//   progress: number;
//   status: string;
// };

// const ProjectDetails1 = () => {
//   console.log("ProjectDetails");
//   const { id } = useParams<{ id: string }>();
//   const [project, setProject] = useState<ProjectDTOExtended | undefined>(undefined);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "documents" | "gallery" | "comments">("overview");

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setProject({
//         id: 1,
//         title: "Modern Residence",
//         description: "A beautiful modern home.",
//         parentId: null,
//         ownerId: 10,
//         owner: { userId: 10, userName: "Owner 1" },
//         type: "Residential",
//         status: "InProgress",
//         isPublic: true,
//         location: "Tel Aviv",
//         startDate: new Date("2023-01-01T00:00:00Z"),
//         endDate: new Date("2024-01-01T00:00:00Z"),
//         updatedAt: new Date("2023-04-20T12:00:00Z"),
//         clientUserName: "client1",
//         projectImage: "/placeholder.jpg?height=200&width=300",
//         files: [],
//         architectUserNames: [],
//         architects: [],
//         tags: ["Tag1", "Tag2"],
//         progress: 50,
//         tasks: [
//           {
//             id: 1,
//             title: "Task 1",
//             assignee: "Assignee 1",
//             dueDate: new Date("2023-12-01T00:00:00Z"),
//             status: "in-progress",
//           },
//           {
//             id: 2,
//             title: "Task 2",
//             assignee: "Assignee 2",
//             dueDate: new Date("2023-11-01T00:00:00Z"),
//             status: "completed",
//           },
//         ],
//         documents: [
//           {
//             id: 1,
//             name: "Document 1",
//             type: "PDF",
//             size: 12345,
//             uploadedAt: new Date("2023-01-01T00:00:00Z"),
//             url: "https://example.com/document1.pdf",
//           },
//         ],
//         client: "לקוח לדוגמה",
//         images: ["/placeholder.jpg", "/placeholder2.jpg", "/placeholder3.jpg"],
//       });
//       setLoading(false);
//     }, 800);
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="loading-state">
//         <div className="spinner"></div>
//         <p>טוען פרטי פרויקט...</p>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="empty-state">
//         <p>הפרויקט לא נמצא</p>
//         <Link to="/projects" className="back-link">
//           <ArrowLeft size={16} />
//           <span>חזרה לפרויקטים</span>
//         </Link>
//       </div>
//     );
//   }

//   const formatDate = (date: Date | string) => {
//     const d = typeof date === "string" ? new Date(date) : date;
//     const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//     return d.toLocaleDateString(undefined, options);
//   };

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "status-completed";
//       case "in-progress":
//         return "status-progress";
//       case "pending":
//         return "status-pending";
//       default:
//         return "";
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "הושלם";
//       case "in-progress":
//         return "בביצוע";
//       case "pending":
//         return "ממתין";
//       default:
//         return status;
//     }
//   };

//   return (
//     <div className="project-details-page">
//       <div className="project-header">
//         <div className="header-left">
//           <Link to="/projects" className="back-link">
//             <ArrowLeft size={16} />
//             <span>חזרה לפרויקטים</span>
//           </Link>
//           <h1>{project.title}</h1>
//         </div>

//         <div className="header-actions">
//           <button className="action-btn">
//             <Share size={16} />
//             <span>שתף</span>
//           </button>
//           <button className="action-btn">
//             <Edit size={16} />
//             <span>ערוך</span>
//           </button>
//           <button className="action-btn danger">
//             <Trash size={16} />
//             <span>מחק</span>
//           </button>
//         </div>
//       </div>

//       <div className="project-progress-bar">
//         <div className="progress-track">
//           <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
//         </div>
//         <div className="progress-info">
//           <span className="progress-status">{project.status}</span>
//           <span className="progress-percentage">{project.progress}% הושלם</span>
//         </div>
//       </div>

//       <div className="project-tabs">
//         <button
//           className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
//           onClick={() => setActiveTab("overview")}
//           type="button"
//         >
//           <Grid size={16} />
//           <span>סקירה כללית</span>
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "tasks" ? "active" : ""}`}
//           onClick={() => setActiveTab("tasks")}
//           type="button"
//         >
//           <FileText size={16} />
//           <span>משימות</span>
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "documents" ? "active" : ""}`}
//           onClick={() => setActiveTab("documents")}
//           type="button"
//         >
//           <FileText size={16} />
//           <span>מסמכים</span>
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`}
//           onClick={() => setActiveTab("gallery")}
//           type="button"
//         >
//           <ImageIcon size={16} />
//           <span>גלריה</span>
//         </button>
//         <button
//           className={`tab-btn ${activeTab === "comments" ? "active" : ""}`}
//           onClick={() => setActiveTab("comments")}
//           type="button"
//         >
//           <MessageSquare size={16} />
//           <span>הערות</span>
//         </button>
//       </div>

//       <div className="project-content">
//         {activeTab === "overview" && (
//           <div className="overview-tab">
//             <div className="overview-grid">
//               <div className="overview-card description-card">
//                 <h3>תיאור הפרויקט</h3>
//                 <p>{project.description}</p>
//               </div>

//               <div className="overview-card details-card">
//                 <h3>פרטי פרויקט</h3>
//                 <ul className="details-list">
//                   <li>
//                     <div className="detail-icon">
//                       <Users size={16} />
//                     </div>
//                     <div className="detail-content">
//                       <span className="detail-label">לקוח</span>
//                       <span className="detail-value">{project.client}</span>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="detail-icon">
//                       <MapPin size={16} />
//                     </div>
//                     <div className="detail-content">
//                       <span className="detail-label">מיקום</span>
//                       <span className="detail-value">{project.location}</span>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="detail-icon">
//                       <Calendar size={16} />
//                     </div>
//                     <div className="detail-content">
//                       <span className="detail-label">תאריכים</span>
//                       <span className="detail-value">
//                         {/* {formatDate(project.startDate)} - {formatDate(project.endDate)} */}
//                       </span>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="detail-icon">
//                       <Tag size={16} />
//                     </div>
//                     <div className="detail-content">
//                       <span className="detail-label">תגיות</span>
//                       <span className="detail-value">
//                         {project.tags.length === 0 ? "-" : project.tags.join(", ")}
//                       </span>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "tasks" && (
//           <div className="tasks-tab">
//             {project.tasks.length === 0 ? (
//               <p>אין משימות בפרויקט זה.</p>
//             ) : (
//               <table className="tasks-table">
//                 <thead>
//                   <tr>
//                     <th>כותרת</th>
//                     <th>מבצע</th>
//                     <th>תאריך יעד</th>
//                     <th>סטטוס</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project.tasks.map((task) => (
//                     <tr key={task.id} className={getStatusClass(task.status)}>
//                       <td>{task.title}</td>
//                       <td>{task.assignee}</td>
//                       <td>{formatDate(task.dueDate)}</td>
//                       <td>{getStatusText(task.status)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {activeTab === "documents" && (
//           <div className="documents-tab">
//             {project.documents.length === 0 ? (
//               <p>אין מסמכים זמינים.</p>
//             ) : (
//               <ul className="documents-list">
//                 {project.documents.map((doc) => (
//                   <li key={doc.id} className="document-item">
//                     <div className="doc-info">
//                       <FileText size={20} />
//                       <div>
//                         <div className="doc-name">{doc.name}</div>
//                         <div className="doc-meta">
//                           <span>{doc.type}</span> | <span>{(doc.size / 1024).toFixed(2)} KB</span> |{" "}
//                           <span>הועלה ב: {formatDate(doc.uploadedAt)}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="doc-actions">
//                       <a href={doc.url} target="_blank" rel="noopener noreferrer" className="doc-download" download>
//                         <Download size={18} />
//                         <span>הורד</span>
//                       </a>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === "gallery" && (
//           <div className="gallery-tab">
//             {project.images && project.images.length > 0 ? (
//               <div className="gallery-grid">
//                 {project.images.map((img, idx) => (
//                   <img key={idx} src={img} alt={`Image ${idx + 1}`} className="gallery-image" />
//                 ))}
//               </div>
//             ) : (
//               <p>אין תמונות להצגה.</p>
//             )}
//           </div>
//         )}

//         {activeTab === "comments" && (
//           <div className="comments-tab">
//             <p>עוד לא יישם</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails1;
