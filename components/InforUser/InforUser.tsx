import { Login, Message, Notifications } from "@mui/icons-material";
import React from "react";
import {
  IconButton,
  Tooltip,
  Avatar,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { Settings, Logout } from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import MenuContainer from "../Menu/MenuContainer";
const InforUser = () => {
  const { user, logout, token } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex items-center justify-center">
      {token !== "" ? (
        <>
          <div className="flex items-center justify-center ">
            <div className="text-[#1877F2] space-x-2">
              <Message />
              <Notifications />
            </div>
            <Tooltip title={user?.fullName}>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: 32,
                    height: 32,
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ) : (
        <>
          <Link href="/auth">
            <MenuItem>
              <ListItemIcon>
                <Login fontSize="small" />
              </ListItemIcon>
              Login
            </MenuItem>
          </Link>
        </>
      )}

      <MenuContainer anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <Link href={`/profile/${user._id}`}>
          <MenuItem>
            <Avatar className="mr-2" src={user.avatar} /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuContainer>
    </div>
  );
};

export default InforUser;
