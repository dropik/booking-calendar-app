import React from "react";

import Stack from "@mui/material/Stack";

type NotificationsContainerProps = {
  children: React.ReactNode,
}

export default function NotificationsContainer({ children }: NotificationsContainerProps): JSX.Element {
  return (
    <Stack sx={{
      justifyContent: "space-between"
    }}>
      {children}
    </Stack>
  );
}
