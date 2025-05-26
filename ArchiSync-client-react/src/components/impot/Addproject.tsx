// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/reduxStore";
// import { useState } from "react";
// import { PartialProject } from "../../types/types";
// import { Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
// import "../App.css";
// import { addProject } from "../../store/Project";

// const AddProject = () => {
//     const dispatch: AppDispatch = useDispatch();
//     const user = useSelector((state: RootState) => state.connect.user);

//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         isPublic: false,
//     });
//     const [descCount, setDescCount] = useState(0);
//     const [isTyping, setIsTyping] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setForm((prev) => ({
//             ...prev,
//             [name]: type === "checkbox" ? checked : value,
//         }));
//         if (name === "description") {
//             const words = value.split(/\s+/).filter(Boolean);
//             setDescCount(words.length);
//             setIsTyping(true);
//         }
//     };

//     const handleAddProject = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const project: PartialProject = {
//             name: form.name,
//             description: form.description,
//             ownerId: user?.userId ?? 0,
//             isPublic: form.isPublic,
//             parentId: user.mainFolderId,
//         };

//         const resultAction = await dispatch(addProject({ project }));

//         if (addProject.rejected.match(resultAction)) {
//             alert("Failed to add project: " + resultAction.error.message);
//         } else if (addProject.fulfilled.match(resultAction)) {
//             setForm({ name: "", description: "", isPublic: false });
//             setDescCount(0);
//             setIsTyping(false);
//         }
//     };

//     return (
//         <Box component="form" onSubmit={handleAddProject} className="form-container">
//             <TextField
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 label="Project Name"
//                 variant="outlined"
//                 fullWidth
//                 required
//                 className="custom-input"
//             />
//             <TextField
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 label="Project Description"
//                 variant="outlined"
//                 fullWidth
//                 required
//                 multiline
//                 rows={3}
//                 helperText={"Description should be between 40-200 words"}
//                 error={isTyping && (descCount < 40 || descCount > 200)}
//                 className={`custom-input ${isTyping && (descCount < 40 || descCount > 200) ? "error" : ""}`}
//             />
//             <FormControlLabel
//                 sx={{ color: "white" }}
//                 control={
//                     <Checkbox
//                         name="isPublic"
//                         checked={form.isPublic}
//                         onChange={handleChange}
//                         sx={{
//                             color: "white",
//                             '&.Mui-checked': { color: "yellow" }
//                         }}
//                     />
//                 }
//                 label="Public"
//             />

//             <button disabled={descCount < 40 || descCount > 200}
//                 type="submit" className="button button-primary">
//                 Add Project
//             </button>
//         </Box>
//     );
// };

// export default AddProject;