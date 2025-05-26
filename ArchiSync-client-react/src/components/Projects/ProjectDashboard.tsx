// import { ArrowBack } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/reduxStore";
// import { Outlet, useNavigate, useParams } from "react-router";
// import { getFiles } from "../../store/File";
// import ImageFilesDisplay from "../Files/ImageFilesDisplay";
// import DocumentFilesDisplay from "../Files/DocumentFilesDisplay";
// import { PartialProject } from "../../types/types";
// import { Tab, Tabs } from "@mui/material";

// const ProjectDashboard = () => {
//     console.log("ProjectDashboard");
//     const { projectId } = useParams<{ projectId: string }>();
//     const dispatch: AppDispatch = useDispatch();
//     const navigate = useNavigate();

//     const user = useSelector((state: RootState) => state.connect.user);
//     const projects = useSelector((state: RootState) => state.projects.projects);

//     const [openProject, setOpenProject] = useState<PartialProject | null>(null);
//     const [selectedTab, setSelectedTab] = useState(0);

//     useEffect(() => {
//         const storedProject = localStorage.getItem("openProject");
//         if (storedProject) {
//             const project = JSON.parse(storedProject);
//             setOpenProject(project);
//         }
//     }, [dispatch]);

//     useEffect(() => {
//         if (projectId) {
//             const project = projects.find(p => p.id?.toString() === projectId);
//             if (project) {
//                 setOpenProject(project);
//                 localStorage.setItem("openProject", JSON.stringify(project));
//                 dispatch(getFiles({ projectId: +projectId, userId: user.userId!, isPublic: project.isPublic! }));
//             }
//         } else {
//             setOpenProject(null);
//             localStorage.removeItem("openProject");
//         }
//     }, [dispatch, projectId]);

//     return (
//         <>
//             <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3 }}>

//                 <motion.div className="ArrowButton" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)}>
//                     <ArrowBack fontSize="large" />
//                 </motion.div>
//                 {user.RoleName==="architect"&&


//                     <div className="button-container">
//                         <motion.button
//                             className="button button-secondary"
//                             whileHover={{ scale: 1.05, boxShadow: "0 0 20px white" }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => openProject ? navigate(`workSpace/${openProject.title}`) : alert("No project selected")}
//                         >
//                             Sketch & Generate AI
//                         </motion.button>

//                         <motion.button
//                             className="button button-secondary"
//                             whileHover={{ scale: 1.05, boxShadow: "0 0 20px white" }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => openProject ? navigate(`upload/${openProject.title}`) : alert("No project selected")}
//                         >
//                             Upload File
//                         </motion.button>
//                     </div>
//                 }
                
//                 <section className="cards-section">
//                     <h2 style={{ color: "yellow" }}>{openProject?.title}</h2>
//                     <p style={{ color: "white" }}>{openProject?.description}</p>

//                     <Tabs
//                         value={selectedTab}
//                         onChange={(_e, newValue) => setSelectedTab(newValue)}
//                         centered
//                         sx={{
//                             "& .MuiTabs-indicator": { backgroundColor: "yellow" }, 
//                         }}
//                     >
//                         <Tab
//                             label="Images"
//                             sx={{
//                                 color: "yellow",
//                                 "&:hover": {
//                                     backgroundColor: "yellow",
//                                     color: "black",
//                                 },
//                                 "&.Mui-selected": {
//                                     color: "yellow",
//                                 },
//                             }}
//                         />
//                         <Tab
//                             label="Documents"
//                             sx={{
//                                 color: "yellow",
//                                 "&:hover": {
//                                     backgroundColor: "yellow",
//                                     color: "black",
//                                 },
//                                 "&.Mui-selected": {
//                                     color: "yellow",
//                                 },
//                             }}
//                         />
//                     </Tabs>


//                     <div className="cards-container">
//                         {selectedTab === 0 && <ImageFilesDisplay />}
//                         {selectedTab === 1 && <DocumentFilesDisplay />}
//                     </div>
//                 </section>
//             </motion.div>

//             <Outlet />
//         </>
//     );
// };

// export default ProjectDashboard;
