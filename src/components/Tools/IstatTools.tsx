/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

import M3Chip from "../m3/M3Chip";
import M3Dialog from "../m3/M3Dialog";
import M3Skeleton from "../m3/M3Skeleton";
import M3Divider from "../m3/M3Divider";
import M3TextButton from "../m3/M3TextButton";

import { fetchCountriesAsync, fetchIstatMovementsAsync, fetchProvincesAsync, MovementDTO } from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";

type MovementEntry = {
  targa?: string,
  arrivals?: number,
  departures?: number,
};

export default function IstatTools(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(false);
  const [movementsData, setMovementsData] = useState<MovementDTO | undefined>(undefined);
  const [countries, setCountries] = useState<string[] | undefined>(undefined);
  const [provinces, setProvinces] = useState<string[] | undefined>(undefined);

  const isLoaded = Boolean(movementsData) && Boolean(countries) && Boolean(provinces);
  const { italians, foreigns } = splitMovements(movementsData, isLoaded);

  const italianRows = useMovementRowsMemo(italians);
  const foreignRows = useMovementRowsMemo(foreigns);

  function open(): void {
    setSelected(true);
  }

  function close(): void {
    setSelected(false);
    setMovementsData(undefined);
  }

  useEffect(() => {
    async function downloadData(): Promise<void> {
      try {
        const { data } = await fetchIstatMovementsAsync();
        setMovementsData(data);
      } catch (error: any) {
        dispatch(showSnackbarMessage({ type: "error", message: error?.message }));
      }
    }
    if (selected && !movementsData) {
      downloadData();
    }
  }, [dispatch, movementsData, selected]);

  useEffect(() => {
    async function downloadData(): Promise<void> {
      try {
        const { data } = await fetchCountriesAsync();
        setCountries(data);
      } catch (error: any) {
        dispatch(showSnackbarMessage({ type: "error", message: error?.message }));
      }
    }
    if (selected && !countries) {
      downloadData();
    }
  }, [dispatch, countries, selected]);

  useEffect(() => {
    async function downloadData(): Promise<void> {
      try {
        const { data } = await fetchProvincesAsync();
        setProvinces(data);
      } catch (error: any) {
        dispatch(showSnackbarMessage({ type: "error", message: error?.message }));
      }
    }
    if (selected && !provinces) {
      downloadData();
    }
  }, [dispatch, provinces, selected]);

  return (
    <>
      <M3Chip selected={selected} onClick={open} label="ISTAT" />
      <M3Dialog open={selected} onClose={close} heightRem={35.125} transitionDuration={theme.transitions.duration.medium4}>
        <Stack spacing={3} sx={{ p: "1.5rem", minWidth: "45rem", }}>
          <Stack spacing={2} alignItems="center">
            <AddchartOutlinedIcon />
            <Typography variant="headlineSmall">ISTAT</Typography>
            <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <Typography variant="labelLarge" width="9rem">Data:</Typography>
                <Typography variant="titleMedium">{movementsData ? (new Date(movementsData.date)).toLocaleDateString() : <M3Skeleton width="6rem" />}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="flex-end">
                <Typography variant="labelLarge" width="9rem">Presenze precedenti:</Typography>
                <Typography variant="titleMedium">{movementsData ? movementsData.prevTotal : <M3Skeleton width="3rem" />}</Typography>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={0} sx={{ width: "100%" }}>
              <Stack direction="row" sx={{ width: "100%" }}>
                <Typography variant="titleLarge" textAlign="center" sx={{ flexBasis: "50%" }}>Italiani</Typography>
                <Typography variant="titleLarge" textAlign="center" sx={{ flexBasis: "50%" }}>Stranieri</Typography>
              </Stack>
              <Box sx={{ position: "relative", width: "100%", height: "1px", mt: "0.5rem" }}>
                <M3Divider sx={{ position: "absolute", margin: 0, left: "-1.5rem", right: "-1.5rem" }} />
              </Box>
              <Stack direction="row" sx={{ width: "100%", }}>
                <Stack direction="column" sx={{
                  flexBasis: "50%",
                  borderRight: `1px solid ${theme.palette.outline.main}`
                }}>
                  <Stack direction="row" spacing={2} sx={{ width: "calc(100% - 2rem)", py: "0.25rem", mx: "1rem" }}>
                    <Typography variant="titleSmall" textAlign="left" sx={{ flexBasis: "50%" }}>Targa</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Arrivi</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Partenze</Typography>
                  </Stack>
                  <Box sx={{ height: "15rem", overflowY: "overlay" }}>
                    {italianRows}
                  </Box>
                </Stack>
                <Stack direction="column" sx={{ flexBasis: "50%" }}>
                  <Stack direction="row" spacing={2} sx={{ width: "calc(100% - 2rem)", py: "0.25rem", mx: "1rem" }}>
                    <Typography variant="titleSmall" textAlign="left" sx={{ flexBasis: "50%" }}>Targa</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Arrivi</Typography>
                    <Typography variant="titleSmall" textAlign="center" sx={{ flexBasis: "25%" }}>Partenze</Typography>
                  </Stack>
                  <Box sx={{ height: "15rem", overflowY: "overlay" }}>
                    {foreignRows}
                  </Box>
                </Stack>
              </Stack>
              <Box sx={{ position: "relative", width: "100%", height: "1px" }}>
                <M3Divider sx={{ position: "absolute", margin: 0, left: "-1.5rem", right: "-1.5rem" }} />
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "100%" }} justifyContent="flex-end">
              <M3TextButton onClick={close}>Cancella</M3TextButton>
              {isLoaded
                ? <M3TextButton>Esporta</M3TextButton>
                : <Box sx={{
                  width: "4.58rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <CircularProgress size="1.5rem" />
                </Box>
              }
            </Stack>
          </Stack>
        </Stack>
      </M3Dialog>
    </>
  );
}

function splitMovements(movements: MovementDTO | undefined, isLoaded: boolean): { italians: MovementEntry[], foreigns: MovementEntry[] } {
  if (!movements || !isLoaded) {
    return {
      italians: [{}, {}, {}],
      foreigns: [{}, {}, {}],
    };
  }

  const italians: MovementEntry[] = [];
  const foreigns: MovementEntry[] = [];

  for (const movement of movements.movements) {
    if (movement.italia) {
      italians.push({
        targa: movement.targa,
        arrivals: movement.arrivi,
        departures: movement.partenze,
      });
    } else {
      foreigns.push({
        targa: movement.targa,
        arrivals: movement.arrivi,
        departures: movement.partenze,
      });
    }
  }

  return { italians, foreigns };
}

function useMovementRowsMemo(movements: MovementEntry[]): JSX.Element[] {
  return useMemo(() => movements.map((entry, index) => (
    <Stack key={entry.targa ?? index} direction="row" spacing={2} sx={{
      width: "calc(100% - 2rem)",
      height: "2rem",
      py: "0.25rem",
      mx: "1rem",
      boxSizing: "border-box",
      alignItems: "center",
      ".MuiBox-root": {
        height: "max-content",
        boxSizing: "border-box",
      },
    }}>
      <Box sx={{
        flexBasis: "50%",
        maxWidth: "50%",
      }}>
        {entry.targa === undefined
          ? <M3Skeleton variant="rounded" />
          : <Typography variant="bodyLarge" sx={{
            width: "100%",
            display: "inline-block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>{entry.targa}</Typography>
        }
      </Box>
      <Box sx={{ flexBasis: "25%", textAlign: "center" }}>
        {entry.arrivals === undefined
          ? <M3Skeleton variant="rounded" />
          : <Typography variant="bodyLarge">{entry.arrivals}</Typography>
        }
      </Box>
      <Box sx={{ flexBasis: "25%", textAlign: "center" }}>
        {entry.departures === undefined
          ? <M3Skeleton variant="rounded" />
          : <Typography variant="bodyLarge">{entry.departures}</Typography>
        }
      </Box>
    </Stack>
  )), [movements]);
}
