import React, { useState, useRef, useEffect } from "react";
import {
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useTheme } from "@emotion/react";
import { IconButton, Typography, Box, Divider, InputBase } from "@mui/material";

const PostWidget = ({
  postId,
  postUserId,
  name,
  picturePath,
  description,
  location,
  createdAt,
  likes,
  comments,
  userPicturePath,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  // likes = { "userId123123" : true, "userId21232312": false} sample api to check if the user liked it or not
  const isLiked = Boolean(likes[loggedInUserId]); // check if the user exist in the likes object
  const likesCount = Object.keys(likes).length; // count the number of likes

  const { palette } = useTheme();
  // const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3002/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // feature if click outside the comment box, the comment box will close
  const dropDownRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (e.target !== dropDownRef.current) {
        setIsComments(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.addEventListener("click", onClick);
    };
  }, []);
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        createdAt={createdAt}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          src={`http://localhost:3002/assets/${picturePath}`}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      <FlexBetween sx={{ mt: "1rem" }}>
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => patchLike()}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: main }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: main }} />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={(e) => {
                setIsComments(!isComments);
                e.stopPropagation();
              }}
            >
              <ChatBubbleOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box onClick={(e) => e.stopPropagation()} ref={dropDownRef}>
          <InputBase
            placeholder="Commenting..."
            onChange={(e) => setPost(e.target.value)}
            sx={{
              width: "100%",
              background: palette.neutral.light,
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
              mb: "0.5rem",
            }}
          />
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
