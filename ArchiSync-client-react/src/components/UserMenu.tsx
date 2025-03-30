import { Button, Stack, Menu, MenuItem, IconButton, Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import { RootState } from "../store/reduxStore";
import { logout } from "../store/Connect";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";
import { KeyboardArrowDown } from "@mui/icons-material";

const buttonStyle = {
  backgroundColor: "#FFD700",
  color: "black",
  borderRadius: "20px",
  fontWeight: "bold",
};

const UserMenu = () => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.connect.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {user.userName ? (
        <>

          <IconButton onClick={handleClick} sx={{ color: "#FFD700" }}>
          <KeyboardArrowDown sx={{ color: "yellow", fontSize: 20 }} />
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#222",
                color: "white",
                borderRadius: "10px",
                minWidth: "200px",
                padding: "10px",
              },
            }}
          >
            <MenuItem onClick={() => handleNavigate("sideBar/myProjects")}>My Projects</MenuItem>
            <MenuItem onClick={() => handleNavigate("sideBar/addProject")}>Add project</MenuItem>
            <MenuItem onClick={() => handleNavigate("sideBar/Messages")}>Messages</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "red" }}>Log Out</MenuItem>

          </Menu>
        </>
      ) : (
        <Stack direction="row" spacing={2}>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button onClick={() => setSignInModalOpen(true)} sx={buttonStyle} variant="contained">
              Sign In
            </Button>
          </motion.div>
          {isSignInModalOpen && <SignInComponent onClose={() => setSignInModalOpen(false)} />}

          <motion.div whileHover={{ scale: 1.1 }}>
            <Button onClick={() => setSignUpModalOpen(true)} sx={buttonStyle} variant="contained">
              Sign Up
            </Button>
          </motion.div>
          {isSignUpModalOpen && <SignUpComponent onClose={() => setSignUpModalOpen(false)} />}
        </Stack>
      )}
    </Stack>
  );
};

export default UserMenu;
