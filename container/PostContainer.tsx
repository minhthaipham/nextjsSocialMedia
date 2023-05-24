import ButtonCreatePost from "@/components/CreatePost/ButtonCreatePost";
import Post from "@/components/Post/Post";
import SideBar from "@/components/Sidebar/SideBar";
import React from "react";
import { useDispatch } from "react-redux";
import { getPostRequest } from "@/redux/post/actions";
import UserCanKnow from "@/components/UserCanKnow";
const PostContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  React.useEffect(() => {
    dispatch(getPostRequest());
  }, [dispatch]);

  return (
    <div>
      <ButtonCreatePost />
      <div className="flex justify-between">
        <SideBar />
        <div className="flex-1">
          {isLoading ? (
            <div className="animate-pulse">
              <img
                src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif"
                alt="loading"
              />
            </div>
          ) : (
            <Post />
          )}
        </div>
        <UserCanKnow />
      </div>
    </div>
  );
};

export default PostContainer;
