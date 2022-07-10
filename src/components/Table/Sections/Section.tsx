import React, { ReactNode, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import SectionHeader from "./SectionHeader";
import SectionBody from "./SectionBody";

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
      <SectionHeader name={header} collapseCallback={() => setOpen(!open)} />
      <Collapse in={open} easing={theme.transitions.easing.fastOutSlowIn} timeout={theme.transitions.duration.long}>
        <SectionBody>
          {children}
        </SectionBody>
      </Collapse>
    </Box>
  );
}
