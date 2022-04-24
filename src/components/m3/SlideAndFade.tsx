import React from "react";
import Slide, { SlideProps } from "@mui/material/Slide";
import Fade, { FadeProps } from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { SxProps, Theme, useTheme } from "@mui/material/styles";

interface SlideAndFadeProps extends SlideProps, FadeProps {
  boxSx?: SxProps<Theme>;
}

export default function SlideAndFade({ boxSx, children, in: show, ...props}: SlideAndFadeProps): JSX.Element {
  const theme = useTheme();

  return (
    <Slide
      mountOnEnter
      unmountOnExit
      direction="up"
      in={show}
      easing={theme.transitions.easing.fastOutSlowIn}
      timeout={theme.transitions.duration.long}
      {...props}
    >
      <Box sx={boxSx}>
        <Fade
          mountOnEnter
          unmountOnExit
          in={show}
          easing={theme.transitions.easing.fastOutSlowIn}
          timeout={theme.transitions.duration.long}
          {...props}
        >
          <div>{children}</div>
        </Fade>
      </Box>
    </Slide>
  );
}
