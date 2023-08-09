/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import M3Dialog from "../m3/M3Dialog";
import M3Skeleton from "../m3/M3Skeleton";
import M3Divider from "../m3/M3Divider";
import M3TextButton from "../m3/M3TextButton";
import M3IconButton from "../m3/M3IconButton";
import M3FilledButton from "../m3/M3FilledButton";
import M3Fab from "../m3/M3Fab";

import { fetchCountriesAsync, fetchIstatMovementsAsync, fetchProvincesAsync, MovementDTO } from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";

type MovementEntry = {
  id: number,
  targa?: string,
  arrivals?: number,
  departures?: number,
};

export default function Istat(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(false);
  const [movementsData, setMovementsData] = useState<MovementDTO | undefined>(undefined);
  const [countries, setCountries] = useState<string[] | undefined>(undefined);
  const [provinces, setProvinces] = useState<string[] | undefined>(undefined);

  const isLoaded = Boolean(movementsData) && Boolean(countries) && Boolean(provinces);
  const { italians, foreigns } = splitMovements(movementsData, isLoaded);

  function changeTarga(id: number, value: string): void {
    setMovementsData(prevValue => {
      if (!prevValue) {
        return prevValue;
      }

      const movements = [...prevValue.movements];
      movements[id].targa = value;
      return {
        ...prevValue,
        movements: movements,
      };
    });
  }

  function changeArrivals(id: number, value: number): void {
    setMovementsData(prevValue => {
      if (!prevValue) {
        return prevValue;
      }

      const movements = [...prevValue.movements];
      if (Number.isNaN(value)) {
        value = 0;
      }
      movements[id].arrivi = Math.abs(value);
      return {
        ...prevValue,
        movements: movements
      };
    });
  }

  function changeDepartures(id: number, value: number): void {
    setMovementsData(prevValue => {
      if (!prevValue) {
        return prevValue;
      }

      const movements = [...prevValue.movements];
      if (Number.isNaN(value)) {
        value = 0;
      }
      movements[id].partenze = Math.abs(value);
      return {
        ...prevValue,
        movements: movements
      };
    });
  }

  const italianRows = useMovementRowsMemo(italians, provinces ?? [], changeTarga, changeArrivals, changeDepartures);
  const foreignRows = useMovementRowsMemo(foreigns, countries ?? [], changeTarga, changeArrivals, changeDepartures);

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
      <Stack direction="column" spacing={2} sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderRadius: "24px 0px 0px 24px",
        p: "1rem",
        boxSizing: "border-box",
      }}>
        <Stack direction="row" justifyContent="space-between">
          <M3IconButton onClick={() => navigate(-1)}><ArrowBackOutlinedIcon /></M3IconButton>
          <M3FilledButton startIcon={<CheckOutlinedIcon />}>Accetta</M3FilledButton>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" py="1rem">
          <Typography variant="displaySmall">ISTAT</Typography>
          <Stack direction="column" alignItems="flex-end">
            <Typography variant="titleLarge">04/08/2023</Typography>
            <Typography variant="titleMedium">8 presenze precedenti</Typography>
            <Typography variant="titleMedium">24 presenze attuali</Typography>
          </Stack>
        </Stack>
        <Box sx={{
          position: "relative",
          flex: 1,
        }}>
          <Stack direction="row" spacing={2} sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
            <PresenseList title="Italiani" />
            <PresenseList title="Stranieri" />
          </Stack>
        </Box>
      </Stack>
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
                  borderRight: (theme) => `1px solid ${theme.palette.outline.main}`
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
      italians: [{ id: 0 }, { id: 1 }, { id: 2 }],
      foreigns: [{ id: 0 }, { id: 1 }, { id: 2 }],
    };
  }

  const italians: MovementEntry[] = [];
  const foreigns: MovementEntry[] = [];

  for (let i = 0; i < movements.movements.length; i++) {
    const movement = movements.movements[i];
    if (movement.italia) {
      italians.push({
        id: i,
        targa: movement.targa,
        arrivals: movement.arrivi,
        departures: movement.partenze,
      });
    } else {
      foreigns.push({
        id: i,
        targa: movement.targa,
        arrivals: movement.arrivi,
        departures: movement.partenze,
      });
    }
  }

  return { italians, foreigns };
}

function useMovementRowsMemo(
  movements: MovementEntry[],
  options: string[],
  onTargaChange: (index: number, value: string) => void,
  onArrivalsChange: (index: number, value: number) => void,
  onDeparturesChange: (index: number, value: number) => void,
): JSX.Element[] {
  return useMemo(() => movements.map((entry) => (
    <Stack key={entry.id} direction="row" spacing={1} sx={{
      width: "calc(100% - 2rem)",
      py: "0.25rem",
      mx: "1rem",
      boxSizing: "border-box",
      alignItems: "center",
      ".MuiBox-root": {
        height: "max-content",
        boxSizing: "border-box",
      },
    }}>
      {entry.targa === undefined || entry.arrivals === undefined || entry.departures === undefined
        ? <M3Skeleton variant="rounded" height="2.5rem" width="100%" />
        : <>
          <Box sx={{
            flexBasis: "50%",
            maxWidth: "50%",
          }}>
            <TargaAutocomplete
              id="targa"
              value={entry.targa}
              options={options}
              onChange={(_, value) => onTargaChange(entry.id, value as string)}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
          <Box sx={{ flexBasis: "25%", textAlign: "center" }}>
            <FormControl fullWidth>
              <TextField
                id="arrivi"
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={entry.arrivals}
                onChange={event => onArrivalsChange(entry.id, Number.parseInt(event.target.value as string))}
              ></TextField>
            </FormControl>
          </Box>
          <Box sx={{ flexBasis: "25%", textAlign: "center" }}>
            <FormControl fullWidth>
              <TextField
                id="partenze"
                type="number"
                size="small"
                inputProps={{ min: 0 }}
                value={entry.departures}
                onChange={event => onDeparturesChange(entry.id, Number.parseInt(event.target.value as string))}
              ></TextField>
            </FormControl>
          </Box>
        </>
      }
    </Stack>
  )), [movements, options, onTargaChange, onArrivalsChange, onDeparturesChange]);
}

function TargaAutocomplete<T, Multple extends boolean | undefined, FreeSolo extends boolean | undefined>(
  { ...props }: AutocompleteProps<T, Multple, boolean, FreeSolo>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState<"top" | "bottom">("top");

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
    }
  }, [isOpen]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        {...props}
        disableClearable
        forcePopupIcon={false}
        size="small"
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpening(false)}
        slotProps={{
          popper: {
            keepMounted: true,
            modifiers: [
              {
                name: "setTransformOrigin",
                enabled: true,
                phase: "main",
                fn: ({ state }) => {
                  if (state.placement === "top") {
                    setTransformOrigin("bottom");
                  } else {
                    setTransformOrigin("top");
                  }
                }
              }
            ]
          },
          paper: {
            className: isOpening ? "opening" : undefined,
            elevation: isOpening ? 2 : 0,
            sx: {
              backgroundColor: (theme) => theme.palette.surface.main,
              transformOrigin: transformOrigin,
              transition: (theme) => theme.transitions.create(
                ["transform", "opacity", "box-shadow"],
                {
                  duration: isOpening ? theme.transitions.duration.medium4 : theme.transitions.duration.standard,
                  easing: isOpening ? theme.transitions.easing.emphasizedDecelerate : theme.transitions.easing.emphasized,
                }),
              transform: "scaleY(0)",
              opacity: 0,
              "&.opening": {
                transform: "scaleY(1)",
                opacity: 1,
              },
              "&::after": {
                position: "absolute",
                zIndex: 99999,
                pointerEvents: "none",
                content: "' '",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: (theme) => theme.palette.primary.main,
                opacity: (theme) => theme.opacities.surface5,
              },
              "& .MuiAutocomplete-listbox": {
                overflowY: "overlay",
              }
            },
            onTransitionEnd: () => {
              if (!isOpening) {
                setIsOpen(false);
              }
            }
          },
        }}
      />
    </FormControl>
  );
}

type PresenseListProps = {
  title: string,
}

function PresenseList({ title }: PresenseListProps): JSX.Element {
  const theme = useTheme();
  const [scrollTop, setScrollTop] = useState(0);
  const isScrolled = scrollTop > 0;

  return (
    <Stack direction="column" spacing={0} sx={{
      height: "100%",
      boxSizing: "border-box",
      flex: "1",
      backgroundColor: theme.palette.surfaceContainerLow.main,
      borderRadius: "24px",
      overflow: "hidden",
    }} >
      <Stack direction="row" sx={{
        justifyContent: "space-between",
        alignItems: "center",
        p: "1rem",
        zIndex: theme.zIndex.appBar,
        backgroundColor: isScrolled ? theme.palette.surfaceVariant.main : theme.palette.surfaceContainerLow.main,
        transition: theme.transitions.create(["background-color"], { duration: theme.transitions.duration.shorter, easing: theme.transitions.easing.emphasized }),
      }}>
        <Typography variant="headlineMedium" color={theme.palette.onSurfaceVariant.main}>{title}</Typography>
        <M3Fab colorCombination="surface" elevation="none" sx={{ margin: 0 }}><AddOutlinedIcon /></M3Fab>
      </Stack>
      <Box sx={{
        position: "relative",
        flex: 1,
      }}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            p: "1rem",
            overflowY: "auto",
          }}
          onScroll={event => {
            setScrollTop(event.currentTarget?.scrollTop ?? 0);
          }}>
          <PresenseItem />
          <PresenseItem />
          <PresenseItem />
          <PresenseItem />
          <PresenseItem />
          <PresenseItem />
          <PresenseItem />
          <PresenseItem />
        </Stack>
      </Box>
    </Stack>
  );
}

function PresenseItem(): JSX.Element {
  const theme = useTheme();

  return (
    <Stack direction="row" sx={{
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.palette.surfaceContainer.main,
      borderRadius: "12px",
      height: "6rem",
      boxSizing: "border-box",
      px: "1rem",
      flexShrink: 0,
    }}>
      <Stack direction="column" spacing={1}>
        <Typography variant="titleLarge">BZ</Typography>
        <Stack direction="row" spacing={1}>
          <Box sx={{
            backgroundColor: theme.palette.surfaceContainerHighest.main,
            borderRadius: "8px",
            py: "0.25rem",
            px: "1rem",
          }}>
            <Typography variant="labelLarge">9 arrivi</Typography>
          </Box>
          <SwapHorizOutlinedIcon />
          <Box sx={{
            backgroundColor: theme.palette.surfaceContainerLowest.main,
            borderRadius: "8px",
            py: "0.25rem",
            px: "1rem",
          }}>
            <Typography variant="labelLarge">0 partenze</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <M3IconButton><DeleteOutlineOutlinedIcon /></M3IconButton>
        <M3IconButton variant="contained" disableElevation={true} sx={{
          backgroundColor: theme.palette.surfaceContainerLowest.main,
        }}><EditOutlinedIcon /></M3IconButton>
      </Stack>
    </Stack>
  );
}
