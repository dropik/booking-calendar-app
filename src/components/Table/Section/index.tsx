import React, { ReactNode, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import Header from "./Header";
import Body from "./Body";

type Props = {
  children: ReactNode,
  header: string
} & BoxProps;

export default function Section({ children, header, ...props }: Props): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box {...props} sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`
    }}>
      <Header name={header} collapseCallback={() => setOpen(!open)} />
      <Collapse in={open} easing={theme.transitions.easing.fastOutSlowIn} timeout={theme.transitions.duration.long}>
        <Body>
          {children}
        </Body>
      </Collapse>
    </Box>
  );
}
