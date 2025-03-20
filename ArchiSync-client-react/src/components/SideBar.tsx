import { Outlet, Link } from "react-router";
import { Box, Stack, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import UploadIcon from "@mui/icons-material/Upload";

const SideBar = () => {
  return (
    <Stack direction="row" height="100vh">
      {/* Sidebar */}
      <Box sx={{ width: "200px", backgroundColor: "#222", padding: "20px", color: "white" }}>
        <Stack spacing={2}>
        
          <IconButton component={Link} to="myProjects" sx={{ color: "white" }}>
            <FolderIcon fontSize="large" /> Projects
          </IconButton>
          <IconButton component={Link} to="AddProject" sx={{ color: "white" }}>
            <FolderIcon fontSize="large" /> Add project
          </IconButton>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default SideBar;
