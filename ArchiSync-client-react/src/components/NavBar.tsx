import { Link } from "react-router";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/reduxStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FolderIcon from "@mui/icons-material/Folder";
import UploadIcon from "@mui/icons-material/Upload";
import HomeIcon from "@mui/icons-material/Home";
import Profile from "./profile";

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
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <HomeIcon fontSize="large" />
        </Link>
        <Link to="/projects" style={{ color: "white", textDecoration: "none" }}>
          <FolderIcon fontSize="large" />
        </Link>
        <Link to="/upload" style={{ color: "white", textDecoration: "none" }}>
          <UploadIcon fontSize="large" />
        </Link>
      </Stack>

      {/* Right Side - Profile Component */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Profile />
      </Stack>
    </Box>
  );
};

export default NavBar;
