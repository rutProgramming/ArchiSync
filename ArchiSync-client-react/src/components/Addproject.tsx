import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/reduxStore";
import { useRef, useState } from "react";
import { PartialProject } from "../types/types";
import { Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
import "../App.css";
import { addProject } from "../store/Project";

const AddProject = () => {
    const dispatch: AppDispatch = useDispatch();
    const projectNameRef = useRef<HTMLInputElement>(null);
    const projectDescriptionRef = useRef<HTMLInputElement>(null);
    const publicRef = useRef<HTMLInputElement>(null);
    const user = useSelector((state: RootState) => state.connect.user);
    const [descCount, setDescCount] = useState(0);
    const [isTyping, setIsTyping] = useState(false);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const words = e.target.value.split(/\s+/).filter(Boolean);
        setDescCount(words.length);
        setIsTyping(true);
    };
    const handleAddProject = async (event: React.FormEvent) => {
        event.preventDefault();
        const project: PartialProject = {
            name: projectNameRef.current?.value || "",
            description: projectDescriptionRef.current?.value || "",
            ownerId: user?.userId ?? 0,
            isPublic: publicRef.current?.checked || false,
            parentId: user.mainFolderId,
        };

        const resultAction = await dispatch(addProject({ project }));

        if (addProject.rejected.match(resultAction)) {
            alert("Failed to add project: "+ resultAction.error.message);
        } else if (addProject.fulfilled.match(resultAction)) {
            projectNameRef.current!.value = "";
            projectDescriptionRef.current!.value = "";
            publicRef.current!.checked = false;
        }
    };

    return (
        <Box component="form" onSubmit={handleAddProject} className="form-container">
            <TextField
                inputRef={projectNameRef}
                label="Project Name"
                variant="outlined"
                fullWidth
                required
                className="custom-input"
            />
            <TextField
                inputRef={projectDescriptionRef}
                label="Project Description"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={3}
                onChange={handleDescriptionChange}
                helperText={"Description should be between 40-200 words"}
                error={isTyping && (descCount < 40 || descCount > 200)}
                className={`custom-input ${isTyping && (descCount < 40 || descCount > 200) ? "error" : ""}`}
            />
            <FormControlLabel
                sx={{ color: "white" }}
                control={
                    <Checkbox
                        inputRef={publicRef}
                        sx={{
                            color: "white",
                            '&.Mui-checked': { color: "yellow" } 
                        }}
                    />
                }
                label="Public"
            />


            <button disabled={descCount < 40 || descCount > 200}
                type="submit" className="button button-primary">
                Add Project
            </button>
        </Box>



    );
};

export default AddProject;
