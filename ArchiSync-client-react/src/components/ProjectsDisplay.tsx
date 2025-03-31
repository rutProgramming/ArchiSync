import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProjects, GetProgectsArchitect, GetPublicProjects } from "../store/Project";
import { AppDispatch, RootState } from "../store/reduxStore";
import { PartialProject, Project } from "../types/types";
import { AsyncThunk } from "@reduxjs/toolkit";
import { motion } from "framer-motion";
import { Pagination } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",

    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "250px",
        marginTop: theme.spacing(2), 

    },

}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const AutocompleteBox = styled(Box)({
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "black",
    color: "white",
    borderRadius: "4px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    zIndex: 10,
    maxHeight: "200px",
    overflowY: "auto",
});

const ProjectsDisplay = ({ handleOpenProject, fetchProjects }: { handleOpenProject: (project: PartialProject) => Promise<void> | void, fetchProjects: AsyncThunk<Project[], void, {}> | null }) => {
    const projects = useSelector((state: RootState) => state.projects.projects);
    const user = useSelector((state: RootState) => state.connect.user);
    const dispatch: AppDispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProjects, setFilteredProjects] = useState<PartialProject[]>([]);
    const [autocompleteResults, setAutocompleteResults] = useState<PartialProject[]>([]);

    const fuse = new Fuse(projects, {
        keys: ["name", "description"],
        includeScore: true,
        threshold: 0.3,
    });

    useEffect(() => {
        if(user.RoleName==="architect"){
            dispatch(GetProgectsArchitect());
        }
        else if (user?.userName) {
            dispatch(GetAllProjects());
        } else {
            dispatch(GetPublicProjects());
        }
        if (fetchProjects) {
            dispatch(fetchProjects());
        }
    }, [dispatch, user]);

    useEffect(() => {
        setFilteredProjects(projects);
    }, [projects]);

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredProjects(projects);
            setAutocompleteResults([]);
        } else {
            const result = fuse.search(searchQuery);
            setFilteredProjects(result.map(r => r.item));
            setAutocompleteResults([]);
        }
        setCurrentPage(1);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setAutocompleteResults([]);
            return;
        }

        const result = fuse.search(query).map(r => r.item);
        setAutocompleteResults(result.slice(0, 5)); 
    };

    const handleSelectSuggestion = (project: PartialProject) => {
        if(project.name){
            setSearchQuery(project.name);
        }
        setFilteredProjects([project]);
        setAutocompleteResults([]);
    };

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
    const startIndex = (currentPage - 1) * projectsPerPage;
    const displayedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                {autocompleteResults.length > 0 && (
                    <AutocompleteBox>
                        {autocompleteResults.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => handleSelectSuggestion(project)}
                                style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid gray" }}
                            >
                                {project.name}
                            </div>
                        ))}
                    </AutocompleteBox>
                )}
            </Search>
            
            <section className="cards-section">
                <Typography variant="h4" className="section-title">Projects</Typography>
                <div className="cards-container">
                    {displayedProjects.map((project) => (
                        project && project.name && project.description ? (
                            <div className="cards-card" key={project.id}>
                                <h3>{project.name}</h3>
                                <p style={{ width: "230px", height: "100px" }}>{project.description.slice(0, 150) + "..."}</p>
                                <motion.button
                                    className="button button-primary"
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px yellow" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleOpenProject(project)}
                                >
                                    Open
                                </motion.button>
                            </div>
                        ) : null
                    ))}
                </div>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_event, value) => setCurrentPage(value)}
                    sx={{ mt: 3, display: "flex", justifyContent: "center", "& .MuiPaginationItem-root": { color: "white", borderRadius: "50%" } }}
                />
            </section>
        </>
    );
};

export default ProjectsDisplay;
