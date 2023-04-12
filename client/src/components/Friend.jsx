import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

const Friend = ({ friendId, name, subtitle, userPicturePath, createdAt }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate(); BUGS
  // const location = useLocation();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3002/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();
    // console.log(data);
    dispatch(setFriends({ friends: data }));
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            window.location.href = `/profile/${friendId}`;
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} variant="h6" fontWeight="400">
            {subtitle}
          </Typography>
          <Typography color={medium} variant="h6" fontWeight="400">
            {createdAt}
          </Typography>
        </Box>
      </FlexBetween>
      {_id === friendId ? null : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: "primaryDark" }} />
          ) : (
            <PersonAddOutlined sx={{ color: "primaryDark" }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
