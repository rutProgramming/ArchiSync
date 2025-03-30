import { Outlet, Link } from "react-router";
import { Box, Stack, List, ListItemButton, ListItemIcon, ListItemText, Badge } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import { Folder, Mail } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store/reduxStore";
import { fetchUnreadMessagesCount } from "../store/Message";

const SideBar = () => {
  const unreadCount = useSelector((state:RootState) => state.messages.unreadCount); 
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.connect.user);
  
useEffect(() => {
  dispatch(fetchUnreadMessagesCount());
  console.log("Unread messages count fetched:", unreadCount);
}
, [dispatch]);
  return (
    <Stack direction="row" height="100vh">
     <Box
      sx={{
        height: "200px",
        width: "220px",
        backgroundColor: "#222",
        padding: "20px",
        position: "relative",
        top: "150px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0px 4px 10px rgba(246, 243, 176, 0.3)"

      }}
    >
      <List>
        {user.RoleName==="architect"&&(<>
        <ListItemButton
          component={Link}
          to="./myProjects"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "#333", transition: "0.3s" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <DashboardIcon sx={{ color: "white", fontSize: "28px" }} />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="./addProject"
          sx={{
            color: "white",
            marginTop: "10px",
            "&:hover": { backgroundColor: "#333", transition: "0.3s" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <Folder sx={{ color: "white", fontSize: "28px" }} />
          </ListItemIcon>
          <ListItemText primary="Add Project" />
        </ListItemButton>
        </>)}
        <ListItemButton
          component={Link}
          to="./Messages"
          sx={{
            color: "white",
            marginTop: "10px",
            "&:hover": { backgroundColor: "#333", transition: "0.3s" },
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
          <Badge badgeContent={unreadCount} color="error">
            <Mail sx={{ color: "white", fontSize: "28px" }} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItemButton>
      </List>
    </Box>
      <Box sx={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default SideBar;
