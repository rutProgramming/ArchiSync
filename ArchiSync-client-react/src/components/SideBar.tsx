import { Outlet, Link } from "react-router";
import { Box, Stack, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"; 

const SideBar = () => {
  return (
    <Stack direction="row" height="100vh">
      <Box sx={{height:"500px", width: "220px", backgroundColor: "#222", padding: "20px", color: "white",position:"relative",top:"80px" }}>
        <List>
          <ListItemButton component={Link} to="./myProjects" sx={{ color: "white" }}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>

          <ListItemButton component={Link} to="./addProject" sx={{ color: "white" }}>
            <ListItemIcon>
              <CreateNewFolderIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Add Project" />
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
// import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
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
//           <ListItemIcon><CreateNewFolderIcon sx={{ color: "white" }} /></ListItemIcon>
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
