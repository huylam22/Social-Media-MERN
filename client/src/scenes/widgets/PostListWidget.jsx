import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import LoadingSkeleton from "components/LoadingSkeleton";
import WidgetWrapper from "components/WidgetWrapper";

const PostListWidget = ({ userId, isProfile = false }) => {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); // grab all the posts from everyone
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3002/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  const getUserPosts = async () => {
    setLoading(true);
    const response = await fetch(
      `http://localhost:3002/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <>
          <WidgetWrapper sx={{ mt: "1rem" }}>
            <LoadingSkeleton />
          </WidgetWrapper>
          <WidgetWrapper sx={{ mt: "1rem" }}>
            <LoadingSkeleton />
          </WidgetWrapper>
          <WidgetWrapper sx={{ mt: "1rem" }}>
            <LoadingSkeleton />
          </WidgetWrapper>
        </>
      ) : (
        <>
          {posts?.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              picturePath,
              description,
              location,
              createdAt,
              likes,
              comments,
              userPicturePath,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                picturePath={picturePath}
                description={description}
                location={location}
                createdAt={createdAt}
                likes={likes}
                comments={comments}
                userPicturePath={userPicturePath}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default PostListWidget;
