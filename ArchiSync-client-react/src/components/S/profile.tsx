import { Button, Stack, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import { RootState } from "../../store/reduxStore";
import { logout } from "../../store/Connect";
import { motion } from "framer-motion";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";

const buttonStyle = {
  backgroundColor: "#FFD700",
  color: "black",
  borderRadius: "20px",
  fontWeight: "bold",
};

const Profile = () => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.connect.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {user.userName ? (
        <>
         
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button onClick={handleLogout} sx={buttonStyle} variant="contained">
              Logout
            </Button>
          </motion.div>
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
       <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#444",
              padding: "12px 16px", 
              borderRadius: "25px", 
            }}
          >
            <AccountCircleIcon fontSize="large" sx={{ color: "#FFD700", marginRight: "12px" }} />
            <Typography variant="body1" sx={{ color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
              {user.userName}
            </Typography>
          </Box>
    </Stack>
  );
};

export default Profile;
