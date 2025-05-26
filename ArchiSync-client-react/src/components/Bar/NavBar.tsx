import { Link } from "react-router";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import UserMenu from "../S/UserMenu";
import { Folder } from "@mui/icons-material";

const NavBar = () => {
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#222",
        color: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFD700" }}>
          ArchiSync
        </Typography>
        <IconButton component={Link} to="/" sx={{ color: "white" }}>
          <HomeIcon fontSize="medium" />
        </IconButton>
        <IconButton component={Link} to="/projects" sx={{ color: "white" }}>
          <Folder fontSize="medium" />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <UserMenu />
      </Stack>
    </Box>
  );
};

export default NavBar;
