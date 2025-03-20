import { Link } from "react-router";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import UploadIcon from "@mui/icons-material/Upload";
import HomeIcon from "@mui/icons-material/Home";
import UserMenu from "./UserMenu";

const NavBar = () => {

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Side - Website Name & Icons */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFD700" }}>
          ArchiSync
        </Typography>
        <IconButton component={Link} to="/" sx={{ color: "white" }}>
          <HomeIcon fontSize="large" />
        </IconButton>
        <IconButton component={Link} to="/projects" sx={{ color: "white" }}>
          <FolderIcon fontSize="large" />
        </IconButton>
        <IconButton component={Link} to="/upload" sx={{ color: "white" }}>
          <UploadIcon fontSize="large" />
        </IconButton>
        <IconButton component={Link} to="/myProjects" sx={{ color: "white" }}>
          <FolderIcon fontSize="large" />
        </IconButton>
      </Stack>

      {/* צד ימין - פרופיל */}
      <Stack direction="row" spacing={2} alignItems="center">
        <UserMenu />
      </Stack>
    </Box>
  );
};

export default NavBar;
