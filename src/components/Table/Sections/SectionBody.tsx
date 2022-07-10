import React, { ReactNode, Children } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

type Props = {
  children: ReactNode
}

export default function SectionBody({ children }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Stack spacing={0} sx={{
      ...((Children.count(children) > 0) && {
        borderTop: `1px solid ${theme.palette.outline.light}`
      })
    }}>
      {children}
    </Stack>
  );
}
