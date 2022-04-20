import React from "react";
import Slide, { SlideProps } from "@mui/material/Slide";
import Fade, { FadeProps } from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

interface SlideAndFadeProps extends SlideProps, FadeProps {
  boxSx?: SxProps<Theme>;
}

export default function SlideAndFade({ boxSx, children, in: show, ...props}: SlideAndFadeProps): JSX.Element {
  return (
    <Slide
      mountOnEnter
      unmountOnExit
      direction="up"
      in={show}
      easing={{
        enter: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        exit: "cubic-bezier(0.55, 0.06, 0.68, 0.19)"
      }}
      {...props}
    >
      <Box sx={boxSx}>
        <Fade mountOnEnter unmountOnExit in={show} {...props}>
          <div>{children}</div>
        </Fade>
      </Box>
    </Slide>
  );
}
