import React from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

type TabPanelProps = {
  children?: React.ReactNode,
  index: number,
  tab: number,
  id: string,
};

export default function TabPanel({ children, index, tab, id }: TabPanelProps): JSX.Element {
  const theme = useTheme();
  const show = tab === index;

  return (
    <Box
      role="tabpanel"
      id={id}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        p: "1rem",
        opacity: show ? 1 : 0,
        transition: show ? theme.transitions.create(["transform", "opacity"], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.emphasizedDecelerate,
        }) : undefined,
        transform: show ? "none" : (
          tab < index ? "translateX(200px)" : "translateX(-200px)"
        ),
        zIndex: show ? 1 : 0,
      }}
    >
      {show ? children : null}
    </Box>
  );
}
