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
                  <Grid item xs={5.5}>
                    <Box sx={{
                      height: "calc(5rem - 2px)",
                      borderTopRightRadius: "0.75rem",
                      borderBottomRightRadius: "0.75rem",
                      border: `1px dashed ${theme.palette.outline.light}`,
                      borderLeft: 0
                    }}></Box>
                  </Grid>
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
