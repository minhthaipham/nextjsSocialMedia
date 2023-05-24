import { userCanKnow } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
import { IUser } from "@/model/user";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {
  Image as ImageIcon,
  Work as WorkIcon,
  BeachAccess as BeachAccessIcon,
} from "@mui/icons-material";
import Link from "next/link";
const UserCanKnow = () => {
  const { user } = useAuth();
  const [users, setUsers] = React.useState<IUser[]>([]);
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user?._id) {
          const res = await userCanKnow(user?._id);
          if (res?.status) {
            setUsers(res.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [user?._id]);
  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-center">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "fixed",
            top: 0,
            mt: 10,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Users you may know
          </Typography>
          {users?.map((user) => (
            <ListItem key={user._id}>
              <ListItemAvatar>
                <Link href={`/profile/${user._id}`}>
                  <Avatar
                    alt={user.fullName}
                    src={user.avatar}
                    sx={{ width: 32, height: 32 }}
                  />
                </Link>
              </ListItemAvatar>
              <ListItemText
                primary={user.fullName}
                secondary={user.followers.length + " followers"}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default UserCanKnow;
