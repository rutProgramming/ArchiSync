import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { StyleHeader } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reduxStore';

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name ? name[0].toUpperCase() : '?',
  };
}

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.connect.user);
  console.log("ProfilePage Rendering... User:", user); // בדיקת נתוני המשתמש

  return (
    <div style={{ ...StyleHeader, backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
      {user && user.userName ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar {...stringAvatar(user.userName)} />
          <Typography variant="h6">{user.userName}</Typography>
        </Stack>
      ) : (
        <Typography variant="h6">User not found</Typography>
      )}
    </div>
  );
}
