import { ArrowBack, ArrowBackIosOutlined, ArrowLeft } from "@mui/icons-material"
import { Button } from "@mui/material"
import { motion } from "framer-motion"
import { PartialFolder } from "../types/types"
import "../App.css"

const FilesInProject = ({ openProject, handleBack }: { openProject: PartialFolder, handleBack: () => void }) => {
    return (<>

        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-gray-800 p-6 shadow-lg flex flex-col z-50 overflow-auto"
        >

            <motion.div
                className="ArrowButton"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBack}
            >
                <ArrowBack fontSize="large" />
            </motion.div>
            <section className="cards-section"  >

                <h2 style={{ color: "yellow" }} >{openProject.name}</h2>
                <p style={{ color: "white" }}>{openProject.description}</p>
                    <div className="cards-container">
                        <h3 style={{ color: "yellow" }}>Files</h3>
                        {/* <ul className="text-white">
                                {openProject.files && openProject.files.length > 0 ? (
                                    openProject.files.map((file, index) => (
                                        <li key={index} className="p-2 border-b border-gray-600">{file.name}</li>
                                    ))
                                ) : (
                                    <p className="text-gray-400">No files available.</p>
                                )}
                            </ul> */}
                    </div>
                  
            </section>

        </motion.div>
    </>
    )
}

export default FilesInProject