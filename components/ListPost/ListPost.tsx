import React, { Fragment } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Close,
  Favorite as FavoriteIcon,
  MoreHoriz,
  Share as ShareIcon,
  AutoFixHigh,
  Bookmark,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getPost,
  getPostByIdUserRequest,
  getPostRequest,
} from "@/redux/post/actions";
import { IPost } from "@/interface/post";
import MenuContainer from "../Menu/MenuContainer";
import ModalCreatePost from "../CreatePost/ModalCreatePost";
import { useRouter } from "next/router";
import Link from "next/link";
import { deletePost, likePost } from "@/api/postApi";
import { useAuth } from "@/context/AuthContext";
import { listPost, listPostByIdUser } from "@/redux/post/selectors";
import CommentContainer from "../Comment/CommentContainer";
import { toast } from "react-toastify";
import { usePostDispatch } from "@/libs/hook/usePost";
// const ListPost = () => {
export default function ListPost() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const listPostSL = useSelector(listPost);
  const listPostByIDSel = useSelector(listPostByIdUser);
  const listPostName =
    router.pathname === "/profile/[id]" ? listPostByIDSel : listPostSL;
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const dispatchPostRequest = usePostDispatch();
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const handleGetIdPost = (post: IPost) => {
    dispatch(
      getPost({
        content: post.content,
        image: post.image,
        idPost: post._id,
      })
    );
  };

  const handleLikePost = async (idPost: string) => {
    try {
      const res = await likePost(idPost, user?._id);
      if (res.status === 200) {
        if (res.data.status) {
          dispatchPostRequest();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePost = async (idPost: string) => {
    const result = confirm("Are you sure you want to delete this post?");
    if (result) {
      try {
        const res = await deletePost(user?._id, idPost);
        if (res.status === 200) {
          if (res.data.status) {
            toast(res.data.message);
            dispatchPostRequest();
          } else {
            toast(res.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      {listPostName?.map((post) => (
        <div key={post._id} onClick={() => handleGetIdPost(post)}>
          <Card
            sx={{
              maxWidth: 600,
              margin: "0 auto",
              marginTop: "1rem",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              "&:hover": {
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              },
            }}
            className="my-3"
          >
            <CardHeader
              titleTypographyProps={{
                fontWeight: "bold",
              }}
              avatar={
                <Link href={`/profile/${post.creator._id}`}>
                  <Avatar
                    src={post?.creator?.avatar}
                    alt={post.creator.fullName}
                    className="cursor-pointer"
                  >
                    {post.creator.fullName}
                  </Avatar>
                </Link>
              }
              action={
                <div aria-label="settings" className="space-x-2 cursor-pointer">
                  <MoreHoriz onClick={handleClick} />
                  <Close onClick={() => handleDeletePost(post._id)} />
                </div>
              }
              title={post.creator.fullName}
              subheader={moment(post.createdAt).fromNow()}
            />
            {post.image && (
              <CardMedia
                component="img"
                image={post.image}
                alt={post.content}
                className="cursor-pointer
                object-cover
              "
              />
            )}
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
            <div className="flex items-center justify-between">
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleLikePost(post._id)}
                >
                  <FavoriteIcon
                    color={
                      post.likes.find((like) => like === user?._id)
                        ? "error"
                        : "inherit"
                    }
                  />
                </IconButton>
              </CardActions>
              <div className="mr-3 cursor-pointer">
                {post.likes.length} {post.likes.length > 1 ? "likes" : "like"}
                <span className="ml-3">
                  {post.comments.length}{" "}
                  {post.comments.length > 1 ? "comments" : "comment"}
                </span>
              </div>
            </div>
            <Divider
              sx={{
                width: "80%",
                margin: "0px auto",
              }}
            />
            <CommentContainer comment={post?.comments} />
          </Card>
        </div>
      ))}

      <MenuContainer anchorEl={anchorEl} open={open} handleClose={handleClose}>
        {router.pathname === "/profile/[id]" ? (
          <MenuItem onClick={() => setOpenModal(true)}>
            <ListItemIcon>
              <AutoFixHigh fontSize="small" />
            </ListItemIcon>
            Edit Post
          </MenuItem>
        ) : (
          <MenuItem>
            <ListItemIcon>
              <Bookmark fontSize="small" />
            </ListItemIcon>
            Save Post
          </MenuItem>
        )}
      </MenuContainer>
      <ModalCreatePost open={openModal} onClose={handleCloseModal} />
    </div>
  );
}

// export default ListPost;
