import { Outlet, Link } from "react-router";
import { Box, Stack, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import { Folder, Mail } from "@mui/icons-material";

const SideBar = () => {
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
            <Mail sx={{ color: "white", fontSize: "28px" }} />
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
// import { useState } from "react";
// import { Outlet, Link } from "react-router";
// import { Box, Stack, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Drawer } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CreateNewProjectIcon from "@mui/icons-material/CreateNewProject";
// import MenuIcon from "@mui/icons-material/Menu";
// import useMediaQuery from "@mui/material/useMediaQuery";

// const SideBar = () => {
//   const [open, setOpen] = useState(false);
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const sidebarContent = (
//     <Box sx={{ width: 220, backgroundColor: "#222", height: "100vh", padding: "20px", color: "white" }}>
//       <List>
//         <ListItemButton component={Link} to="/myProjects" sx={{ color: "white" }}>
//           <ListItemIcon><DashboardIcon sx={{ color: "white" }} /></ListItemIcon>
//           <ListItemText primary="Projects" />
//         </ListItemButton>
//         <ListItemButton component={Link} to="/addProject" sx={{ color: "white" }}>
//           <ListItemIcon><CreateNewProjectIcon sx={{ color: "white" }} /></ListItemIcon>
//           <ListItemText primary="Add Project" />
//         </ListItemButton>
//       </List>
//     </Box>
//   );

//   return (
//     <Stack direction="row" height="100vh">
//       {isMobile ? (
//         <>
//           <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 20, left: 20, color: "white", zIndex: 1000 }}>
//             <MenuIcon />
//           </IconButton>
//           <Drawer anchor="left" open={open} onClose={toggleDrawer}>
//             {sidebarContent}
//           </Drawer>
//         </>
//       ) : (
//         <Box sx={{ position: "fixed", top: "100px", height: "100vh" }}>{sidebarContent}</Box>
//       )}
//       <Box sx={{ flex: 1, padding: "20px", marginLeft: isMobile ? 0 : "220px" }}>
//         <Outlet />
//       </Box>
//     </Stack>
//   );
// };

// export default SideBar;
