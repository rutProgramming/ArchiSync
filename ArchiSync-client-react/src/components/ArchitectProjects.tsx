import { motion } from "framer-motion";
import "../App.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  addProject } from "../store/Folder";
import { AppDispatch, RootState } from "../store/reduxStore";


const ArchitectProjects = () => {
    const folderNameRef = useRef<HTMLInputElement>(null);
    const publicRef = useRef<HTMLInputElement>(null);
    const user = useSelector((state: RootState) => state.connect.user);
    const dispatch: AppDispatch = useDispatch();

    const handleAddFolder = async (event: React.FormEvent) => {
        console.log(folderNameRef.current?.value);
        event.preventDefault();
        const resultAction = await dispatch(addProject({ folderName: folderNameRef.current?.value || "", isPublic: publicRef.current?.checked || false, userId: user.id! }));
        console.log(resultAction);

        if (!resultAction) {
            const projectName = folderNameRef.current?.value || "";
            const isPublic = publicRef.current?.checked || false;
        }

    };

    return (
        <form onSubmit={handleAddFolder}>
            <motion.input
                type="text"
                placeholder="Project Name"
                size={20}
                ref={folderNameRef}
                required
            />

            <input type="checkbox" id="publicCheckbox" ref={publicRef} />
            <label htmlFor="publicCheckbox" style={{ color: "white" }}>Public</label>

            <motion.button type="submit" className="button button-secondary">
                Add Project
            </motion.button>
        </form>
    );
};

export default ArchitectProjects;
