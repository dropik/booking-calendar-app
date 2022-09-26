import React, { ReactNode, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import Header from "./Header";
import Body from "./Body";

type Props = {
  children: ReactNode,
  header: string
};

export default function Section({ children, header }: Props): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{
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
