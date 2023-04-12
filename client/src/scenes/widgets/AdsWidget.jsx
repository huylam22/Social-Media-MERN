import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdsWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h5" sx={{ color: dark }}>
          Ads
        </Typography>
        <Typography color={medium}> Create Ad </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="ads"
        src="http://localhost:3002/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0/75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>HelloCosmetics</Typography>
        <Typography color={medium}>hellocosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ad
        commodi quae fuga voluptas officia quasi autem officiis recusandae in
        magnam quisquam saepe accusantium voluptate consequatur, facilis nemo
        aut temporibus?
      </Typography>
    </WidgetWrapper>
  );
};

export default AdsWidget;
