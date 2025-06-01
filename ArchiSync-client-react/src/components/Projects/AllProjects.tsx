import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reduxStore";
import { useEffect, useState, useMemo } from "react";
import { PartialMessage } from "../../types/types";
import { Typography, Modal, Box } from "@mui/material";
import { GetAllProjects, GetProjectById } from "../../store/Project";
import { createMessage } from "../../store/Message";
import { checkProjectAccess } from "../../store/Premission";
import { useNavigate } from "react-router";
import { Search, Filter, Grid3X3, List, Eye } from "lucide-react";
import Button from "../Additional/Button";
import "./Projects.css";
import "../Dashboard/Dashboard.css";
import ProjectCard from "./ProjectCard";
import { ProjectDTO } from "../../types/Project";

type SortOption = 'title' | 'updatedAt' | 'isPublic'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'grid' | 'list'

const AllProjects = () => {
    const user = useSelector((state: RootState) => state.connect.user);
    const projects = useSelector((state: RootState) => state.projects.projects);
    const dispatch: AppDispatch = useDispatch();
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [accessFilter, setAccessFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectDTO | null>(null);
    useEffect(() => {
        setIsLoading(true);
        if (user?.userId) {
            dispatch(GetAllProjects()).finally(() => setIsLoading(false));
        }
    }, [dispatch, user]);

    const filteredAndSortedProjects = useMemo(() => {
        if (!projects) return [];

        let filtered = projects.filter(project => {
            const matchesSearch = !searchTerm ||
                project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesAccess = accessFilter === "all" ||
                (accessFilter === "public" && project.isPublic) ||
                (accessFilter === "private" && !project.isPublic);

            return matchesSearch && matchesAccess;
        });

        filtered.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (sortBy) {
                case 'title':
                    aValue = a.title?.toLowerCase() || '';
                    bValue = b.title?.toLowerCase() || '';
                    break;
                case 'updatedAt':
                    aValue = new Date(a.updatedAt || 0).getTime();
                    bValue = new Date(b.updatedAt || 0).getTime();
                    break;
                case 'isPublic':
                    aValue = a.isPublic ? 1 : 0;
                    bValue = b.isPublic ? 1 : 0;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [projects, searchTerm, accessFilter, sortBy, sortDirection]);

    const handleOpenProject = async (projectId: number): Promise<void> => {
        if (projectId) {
            try {
                let response = null;
                if (user?.userId) {
                    response = await dispatch(checkProjectAccess(projectId)).unwrap();
                }
                if (response?.hasAccess) {
                    navigate(`/projects/${projectId}`);
                    sessionStorage.setItem("projectId", projectId.toString());

                } else {
                    setSelectedProject(projects.find(p => p.id === projectId) || null);
                    setShowRequestModal(true);
                }
            } catch (error) {
                console.error("check access failed:", error);
            }
        }
    };

    const accessRequest = async () => {
        var id = sessionStorage.getItem("projectId");

        dispatch(GetProjectById(id!));
        if (!selectedProject) return;
        try {
            const newMessage: PartialMessage = {
                userIsRead: false,
                architectIsRead: false,
                approved: false,
                userId: user.userId,
                projectId: selectedProject.id,
                architectId: selectedProject.ownerId
            };

            await dispatch(createMessage({ message: newMessage })).unwrap();
            setShowRequestModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Request failed:", error);
            alert("Failed to send request ");
        }
    };

    const resetFilters = () => {
        setSearchTerm("");
        setAccessFilter("all");
        setSortBy('updatedAt');
        setSortDirection('desc');
    };

    const getAccessCounts = () => {
        if (!projects) return { all: 0, public: 0, private: 0 };
        return {
            all: projects.length,
            public: projects.filter(p => p.isPublic).length,
            private: projects.filter(p => !p.isPublic).length,
        };
    };

    const accessCounts = getAccessCounts();

    if (isLoading) {
        return (
            <div className="projects-page">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="projects-page">
                <div className="page-header">
                    <div className="header-main">
                        <h1>Available Projects ({projects?.length || 0})</h1>
                        <p className="header-subtitle">
                            Browse and access architectural projects
                        </p>
                    </div>
                </div>

                <div className="projects-toolbar">
                    <div className="toolbar-left">
                        <div className="search-container">
                            <Search size={16} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="enhanced-search"
                            />
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="view-toggle">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >
                                <Grid3X3 size={16} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >
                                <List size={16} />
                            </button>
                        </div>

                        <div className="sort-container">
                            <select
                                value={`${sortBy}-${sortDirection}`}
                                onChange={(e) => {
                                    const [field, direction] = e.target.value.split('-');
                                    setSortBy(field as SortOption);
                                    setSortDirection(direction as SortDirection);
                                }}

                                className="sort-select"
                            >
                                <option value="updatedAt-desc">Recently Updated</option>
                                <option value="updatedAt-asc">Oldest Updates</option>
                                <option value="title-asc">Title A-Z</option>
                                <option value="title-desc">Title Z-A</option>
                                <option value="isPublic-desc">Public First</option>
                                <option value="isPublic-asc">Private First</option>
                            </select>
                        </div>

                        <Button
                            variant="outline"
                            icon={<Filter size={16} />}
                            onClick={() => setFilterVisible(prev => !prev)}
                            className={filterVisible ? 'active' : ''}
                        >
                            Filters
                        </Button>
                    </div>
                </div>

                {filterVisible && (
                    <div className="filter-panel">
                        <div className="filter-section">
                            <h4>Project Access</h4>
                            <div className="filter-options-grid">
                                {Object.entries(accessCounts).map(([access, count]) => (
                                    <button
                                        key={access}
                                        className={`filter-chip ${accessFilter === access ? 'active' : ''}`}
                                        onClick={() => setAccessFilter(access)}
                                    >
                                        {access === 'all' ? 'All Projects' :
                                            access === 'public' ? 'Public' :
                                                'Private'} ({count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-actions">
                            <Button variant="outline" onClick={resetFilters}>
                                Reset All
                            </Button>
                            <Button variant="primary" onClick={() => setFilterVisible(false)}>
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                )}

                {(searchTerm || accessFilter !== 'all') && (
                    <div className="results-summary">
                        <p>
                            Showing {filteredAndSortedProjects.length} of {projects?.length || 0} projects
                            {searchTerm && <span> matching "{searchTerm}"</span>}
                        </p>
                        {(accessFilter !== 'all' || searchTerm) && (
                            <Button variant="ghost" onClick={resetFilters}>
                                Clear all filters
                            </Button>
                        )}
                    </div>
                )}

                {filteredAndSortedProjects.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Eye size={48} />
                        </div>
                        <h3>No projects found</h3>
                        <p>
                            {searchTerm || accessFilter !== 'all'
                                ? "Try adjusting your filters or search terms"
                                : "No projects available at the moment"}
                        </p>
                    </div>
                ) : (
                    <div className={`projects-container ${viewMode}-view`}>
                        {filteredAndSortedProjects.map(project => (
                            <div key={project.id} className="enhanced-project-card">
                                <ProjectCard
                                    project={project}
                                    viewMode={viewMode}
                                    handleOpenProject={() => handleOpenProject(project.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal open={showRequestModal} onClose={() => setShowRequestModal(false)}>
                <div className="form-container">
                    <Typography variant="h6" sx={{ color: "white" }}>Access Required</Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: "white" }}>
                        You do not have access to the project.
                        Would you like to request permission?
                    </Typography>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <Button
                            type="submit"
                            className="button button-primary"
                            onClick={accessRequest}
                        >
                            Request Access
                        </Button>
                        <Button
                            type="submit"
                            className="button button-secondary"
                            onClick={() => setShowRequestModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
                <div className="form-container">
                    <Typography variant="h6" sx={{ color: "#FFD700", textAlign: "center" }}>
                        Request Sent!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: "white", textAlign: "center" }}>
                        Your request has been sent to the project owner. Once approved, you will gain access.
                    </Typography>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                        <button
                            type="submit"
                            className="button button-primary"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            OK
                        </button>
                    </Box>
                </div>
            </Modal>
        </>
    );
};

export default AllProjects;