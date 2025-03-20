import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useRef } from "react";
import { PartialFolder } from "../types/types";
import { addProject } from "../store/Folder";
import { motion } from "framer-motion";
import "../App.css";

const addProgect = () => {
    const dispatch: AppDispatch = useDispatch();
    const projectNameRef = useRef<HTMLInputElement>(null);
    const projectDescription = useRef<HTMLInputElement>(null);
    const publicRef = useRef<HTMLInputElement>(null);
    const user = useSelector((state: RootState) => state.connect.user);

    const handleAddFolder = async (event: React.FormEvent) => {
        event.preventDefault();
        const project: PartialFolder = {
            name: projectNameRef.current?.value || "",
            description: projectDescription.current?.value || "",
            ownerId: user?.userId ?? 0,
            isPublic: publicRef.current?.checked || false,
            parentId: user.mainFolderId,
        }
        console.log(project);
        const resultAction = await dispatch(
            addProject({ project })
        );

        if (addProject.rejected.match(resultAction)) {
            console.error("Failed to add project:", resultAction.error.message);
        }
        else if (addProject.fulfilled.match(resultAction)) {
            projectNameRef.current!.value = "";
            projectDescription.current!.value = "";
            publicRef.current!.checked = false;
            // if (user?.userId)
            //     dispatch(GetProgectsArchitect());
        }
    };
    return (
        <form onSubmit={handleAddFolder}>
            <motion.input
                type="text"
                placeholder="Project Name"
                size={20}
                ref={projectNameRef}
                required
            />
            <motion.input
                type="text"
                placeholder="Project description"
                size={20}
                ref={projectDescription}
                required
            />
            <input type="checkbox" id="publicCheckbox" ref={publicRef} />
            <label htmlFor="publicCheckbox" style={{ color: "white" }}>Public</label>

            <motion.button type="submit" className="button button-secondary">
                Add Project
            </motion.button>
        </form>
    )
}

export default addProgect