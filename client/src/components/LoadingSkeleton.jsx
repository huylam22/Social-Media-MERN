import React from "react";
import Skeleton from "@mui/material/Skeleton";
import {
  ChatBubbleOutlineOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { Box, useTheme } from "@mui/material";

const LoadingSkeleton = () => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const main = palette.neutral.main;

  return (
    <>
      <FlexBetween gap="1rem">
        <Box display="flex" gap="1rem">
          <Skeleton
            animation="wave"
            variant="circular"
            width={60}
            height={60}
          />
          <Box>
            <Skeleton
              animation="wave"
              height={20}
              width={60}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              animation="wave"
              height={20}
              width={60}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width={60} />
          </Box>
        </Box>
        <Skeleton
          variant="circular"
          sx={{ backgroundColor: primaryLight, p: "0.6rem", mb: "1rem" }}
          animation="wave"
          width={35}
          height={35}
        ></Skeleton>
      </FlexBetween>

      <FlexBetween sx={{ mt: "1rem" }}>
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem"></FlexBetween>
        </FlexBetween>
      </FlexBetween>
      <Skeleton
        animation="wave"
        height={20}
        width="100%"
        sx={{ mb: "0.75rem" }}
      />
      <Skeleton
        sx={{ height: 300, mb: "0.75rem" }}
        animation="wave"
        variant="rectangular"
      />
      <React.Fragment>
        <Box display="flex" gap="1rem">
          <Box display="flex" gap="0.5rem">
            <FavoriteOutlined sx={{ color: main }} />
            <Skeleton
              animation="wave"
              height={20}
              width={20}
              style={{ marginBottom: 6 }}
            />
          </Box>
          <Box display="flex" gap="0.5rem">
            <ChatBubbleOutlineOutlined />
            <Skeleton
              animation="wave"
              height={20}
              width={20}
              style={{ marginBottom: 6 }}
            />
          </Box>
        </Box>

        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </React.Fragment>
    </>
  );
};

export default LoadingSkeleton;
