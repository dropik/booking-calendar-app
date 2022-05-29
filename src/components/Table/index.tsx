import React from "react";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";

import M3IconButton from "../m3/M3IconButton";
import DrawerAdjacent from "../m3/DrawerAdjacent";

export default function Table(): JSX.Element {
  const theme = useTheme();

  return (
    <DrawerAdjacent>
      <Stack spacing={1} sx={{
        mt: "9.5rem",
        color: theme.palette.onSurface.light
      }}>
        <Box>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: "2rem",
            pr: "2rem",
            pt: "1rem",
            pb: "1rem",
            borderBottom: `1px solid ${theme.palette.outline.light}`
          }}>
            <Typography variant="headlineMedium">Piano 1</Typography>
            <M3IconButton>
              <ExpandLessOutlined />
            </M3IconButton>
          </Box>
          <Stack spacing={0}>
            <Box sx={{
              position: "relative"
            }}>
              <Box sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                left: 0,
                top: 0,
                bottom: 0,
                width: "5.5rem",
                pr: "1rem",
                pl: "1rem",
                borderRight: `1px solid ${theme.palette.outline.light}`
              }}>
                <Typography variant="labelLarge">1</Typography>
                <Typography variant="bodySmall">tripla standard</Typography>
              </Box>
              <Box sx={{
                ml: "7.5rem",
                mt: "0.5rem",
                mb: "0.5rem"
              }}>
                <Grid container columnSpacing={1} rowSpacing={0} columns={7}>
                  <FreeSpace variant="left" nights={6} />
                  <Grid item xs={1.5}>
                    <Badge anchorOrigin={{ vertical: "top", horizontal: "left" }} badgeContent=" " color="error" variant="dot" sx={{
                      display: "block",
                      "& .MuiBadge-badge": {
                        top: "0.75rem",
                        left: "0.75rem"
                      }
                    }}>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        height: "3rem",
                        p: "1rem",
                        borderTopLeftRadius: "0.75rem",
                        borderBottomLeftRadius: "0.75rem",
                        backgroundColor: theme.palette.booking1Container.light,
                        color: theme.palette.onBooking1Container.light,
                      }}>
                        <Typography variant="titleMedium">Ivan Petrov - 3 persone</Typography>
                        <Typography variant="bodySmall">tripla alpina</Typography>
                      </Box>
                    </Badge>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </DrawerAdjacent>
  );
}

type FreeSpaceProps = {
  variant: "left" | "right" | "center",
  nights: number
};

function FreeSpace({ variant, nights }: FreeSpaceProps): JSX.Element {
  const theme = useTheme();

  const size = variant === "center" ? nights : nights - 0.5;

  const cells: JSX.Element[] = [];

  if (variant !== "left") {
    cells.push(<Grid key={0} item xs={1} sx={{ borderRight: `1px dashed ${theme.palette.outline.light}` }}></Grid>);
  }

  for (let i = 1; i < nights; i++) {
    cells.push(<Grid key={i} item xs={2} sx={{ borderRight: `1px dashed ${theme.palette.outline.light}` }}></Grid>);
  }

  return (
    <Grid item xs={size}>
      <Box sx={{
        height: "calc(3rem - 2px)",
        borderRadius: "0.75rem",
        pt: "1rem",
        pb: "1rem",
        border: `1px dashed ${theme.palette.outline.light}`,
        ...(variant === "left" && {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 0
        }),
        ...(variant === "right" && {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 0
        })
      }}>
        <Grid container spacing={0} columns={size * 2} sx={{ height: "100%" }}>
          {cells}
        </Grid>
      </Box>
    </Grid>
  );
}
