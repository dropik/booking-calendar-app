import React, { ReactNode, Children } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

type SectionBodyProps = {
  children: ReactNode
}

export default function SectionBody({ children }: SectionBodyProps): JSX.Element {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={0} sx={{
      ...((Children.count(children) > 0) && {
        borderTop: `1px solid ${theme.palette.outline.light}`
      })
    }}>
      {children}
    </Stack>
  );
}
