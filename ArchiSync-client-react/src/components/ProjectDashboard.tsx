import { ArrowBack } from "@mui/icons-material"
import { motion } from "framer-motion"
import "../App.css"
import { Modal, Stack, Tooltip } from "@mui/material"
import { useEffect, useState } from "react"
import Workspace from "./Workspace"
import { RootState } from "../store/reduxStore"
import { useSelector } from "react-redux"
import { Outlet, useNavigate, useParams } from "react-router"
import { PartialProject } from "../types/types"

const ProjectDashboard = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [im, setim] = useState(false);
    const files = useSelector((state: RootState) => state.files.files);
    const navigate = useNavigate();
    const projects = useSelector((state: RootState) => state.projects.projects);
    const [openProject, setOpenProject] = useState<PartialProject | null>(null);
    useEffect(() => {
        if (projectId) {
            const project = projects.find(project => project.id?.toString() === projectId);
            setOpenProject(project || null);
        } else {
            setOpenProject(null);
        }
    }, [projects, projectId]);

console.log(openProject)
console.log(projectId)
return (<>

    <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3 }}
    >
        <motion.div
            className="ArrowButton"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
        >
            <ArrowBack fontSize="large" />
        </motion.div>

        <Stack direction="row" spacing={3} alignItems="end" margin={"30px"} >

            <Tooltip title="Open the AI-powered workspace to transform sketches into images.">

                <div className="button-container">
                    <motion.button
                        //onClick={() => setim(!im)}
                        className="button button-secondary"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px white" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`workSpace/${openProject?.name}`)}

                    >
                        Sketch & Generate AI
                    </motion.button>

                </div>
            </Tooltip>
            <div className="button-container">
                <motion.button
                    className="button button-secondary"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px white" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`upload/${openProject?.name}`)}

                >
                    upload File
                </motion.button>
            </div>
        </Stack>
        <section className="cards-section"  >

            <h2 style={{ color: "yellow" }} >{openProject?.name}</h2>
            <p style={{ color: "white" }}>{openProject?.description}</p>
            <div className="cards-container">
                <h3 style={{ color: "yellow" }}>Files</h3>
                <ul className="text-white">
                    {files && files.length > 0 ? (
                        files.map((file, index) => (
                            <li key={index} className="p-2 border-b border-gray-600">{file.fileName}</li>
                        ))
                    ) : (
                        <p className="text-gray-400">No files available.</p>
                    )}
                </ul>
            </div>

        </section>

    </motion.div >
    <Modal open={im} onClose={() => setim(false)}>
        <Workspace />
    </Modal>
    <Outlet />
</>
)
}

export default ProjectDashboard


/*
                <Stack direction="column" spacing={3} alignItems="center">

                   
                    <TextField
                        value={userId}
                        placeholder="Enter User ID"
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        className="custom-input"
                        sx={{ width: "180px" }}
                    />
                    <div className="button-container">
                        <motion.button
                            onClick={handleAddPermission}
                            className="button button-secondary"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px white" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Add Permission
                        </motion.button>
                    </div>
                </Stack> */