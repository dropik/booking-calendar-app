/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";

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

import {
  fetchCountriesAsync,
  fetchIstatMovementsAsync,
  fetchProvincesAsync,
  MovementDTO,
} from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";
import Input from "@mui/material/Input";

type MovementEntry = {
  targa?: string;
  arrivals?: number;
  departures?: number;
};

export default function Istat(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [movementsData, setMovementsData] = useState<MovementDTO | undefined>(undefined);
  const [italians, setItalians] = useState<MovementEntry[]>([{ }, { }]);
  const [foreigns, setForeigns] = useState<MovementEntry[]>([{ }, { }]);

  const isLoaded = italians.every(i => i.targa) && foreigns.every(i => i.targa);
  let totalArrivals = 0;
  let totalDepartures = 0;
  for (const entry of italians) {
    totalArrivals += entry.arrivals ?? 0;
    totalDepartures += entry.departures ?? 0;
  }
  for (const entry of foreigns) {
    totalArrivals += entry.arrivals ?? 0;
    totalDepartures += entry.departures ?? 0;
  }
  const nextTotal =
    movementsData?.prevTotal === undefined
      ? undefined
      : movementsData.prevTotal + totalArrivals - totalDepartures;

  useEffect(() => {
    let isSubscribed = true;

    async function downloadData(): Promise<void> {
      try {
        const { data } = await fetchIstatMovementsAsync();
        if (isSubscribed) {
          setMovementsData(data);
          const { italians: newItalians, foreigns: newForeigns } = splitMovements(data);
          setItalians(newItalians);
          setForeigns(newForeigns);
        }
      } catch (error: any) {
        if (isSubscribed) {
          dispatch(
            showSnackbarMessage({ type: "error", message: error?.message })
          );
        }
      }
    }
    if (!movementsData) {
      downloadData();
    }

    return () => {
      isSubscribed = false;
    };
  }, [dispatch, movementsData]);

  function addItalianEntry(entry: MovementEntry): void {
    setItalians([...italians, entry]);
  }

  function addForeignEntry(entry: MovementEntry): void {
    setForeigns([...foreigns, entry]);
  }

  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: theme.palette.surfaceContainer.main,
          borderRadius: "24px 0px 0px 24px",
          p: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <M3IconButton onClick={() => navigate(-1)}>
            <ArrowBackOutlinedIcon />
          </M3IconButton>
          {isLoaded ? (
            <M3FilledButton startIcon={<CheckOutlinedIcon />}>
              Accetta
            </M3FilledButton>
          ) : <></>}
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py="1rem"
        >
          <Typography variant="displaySmall">ISTAT</Typography>
          <Stack direction="column" alignItems="flex-end">
            <Typography variant="titleLarge">{!movementsData ? <M3Skeleton width="8rem" /> : movementsData.date}</Typography>
            <Typography variant="titleMedium">
              {!movementsData ? <M3Skeleton width="12rem" /> : `${movementsData.prevTotal} presenze precedenti`}
            </Typography>
            <Typography variant="titleMedium">
              {!movementsData ? <M3Skeleton width="12rem" /> : `${nextTotal} presenze attuali`}
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            position: "relative",
            flex: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <PresenseList
              title="Italiani"
              list={italians}
              dialogFloating="left"
              fetchLocations={fetchProvincesAsync}
              onEntryAdd={addItalianEntry}
            />
            <PresenseList
              title="Stranieri"
              list={foreigns}
              dialogFloating="right"
              fetchLocations={fetchCountriesAsync}
              onEntryAdd={addForeignEntry}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

function splitMovements(movements: MovementDTO): { italians: MovementEntry[]; foreigns: MovementEntry[] } {
  const italians: MovementEntry[] = [];
  const foreigns: MovementEntry[] = [];

  for (let i = 0; i < movements.movements.length; i++) {
    const movement = movements.movements[i];
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

type PresenseListProps = {
  title: string;
  list: MovementEntry[];
  dialogFloating: "right" | "left",
  fetchLocations: () => Promise<{data: string[] }>,
  onEntryAdd: (entry: MovementEntry) => void,
};

function PresenseList({ title, list, dialogFloating, fetchLocations, onEntryAdd }: PresenseListProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [scrollTop, setScrollTop] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const isScrolled = scrollTop > 0;

  const usableLocations = locations.filter(l => !list.map(i => i.targa).includes(l));
  const isLoaded = list.every(i => i.targa) && locations.length > 0;

  function closeEdit(): void {
    setEditOpen(false);
  }

  function openEdit(): void {
    setEditOpen(true);
  }

  useEffect(() => {
    let isSubscribed = true;

    async function downloadData(): Promise<void> {
      try {
        const { data } = await fetchLocations();
        if (isSubscribed && data) {
          setLocations(data);
        }
      } catch (error: any) {
        dispatch(showSnackbarMessage({ type: "error", message: error?.message }));
      }
    }

    downloadData();

    return () => {
      isSubscribed = false;
    };
  }, [dispatch, fetchLocations]);

  return (
    <Stack
      direction="column"
      spacing={0}
      sx={{
        height: "100%",
        boxSizing: "border-box",
        flex: "1",
        backgroundColor: theme.palette.surfaceContainerLow.main,
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          p: "1rem",
          zIndex: theme.zIndex.appBar,
          backgroundColor: isScrolled
            ? theme.palette.surfaceVariant.main
            : theme.palette.surfaceContainerLow.main,
          transition: theme.transitions.create(["background-color"], {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.emphasized,
          }),
        }}
      >
        <Typography
          variant="headlineMedium"
          color={theme.palette.onSurfaceVariant.main}
        >
          {title}
        </Typography>
        {!isLoaded ? (
          <Box sx={{
            width: "3.5rem",
            height: "3.5rem",
            backgroundColor: theme.palette.surface.main,
            borderRadius: "16px",
          }}></Box>
        ) : (
          <M3Fab colorCombination="surface" elevation="none" sx={{ margin: 0 }} onClick={openEdit}>
            <AddOutlinedIcon />
          </M3Fab>
        )}
        <MovementEntryDialog
          locations={usableLocations}
          open={editOpen}
          onClose={closeEdit}
          floating={dialogFloating}
          onAcceptAction={onEntryAdd} />
      </Stack>
      <Box
        sx={{
          position: "relative",
          flex: 1,
        }}
      >
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
          onScroll={(event) => {
            setScrollTop(event.currentTarget?.scrollTop ?? 0);
          }}
        >
          {list.map((item, index) => (
            <PresenseItem key={item.targa ?? index} movementEntry={item} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

type PresenseItemProps = {
  movementEntry: MovementEntry;
};

function PresenseItem({ movementEntry }: PresenseItemProps): JSX.Element {
  const theme = useTheme();

  if (!movementEntry.targa) {
    return (
      <M3Skeleton
        variant="rounded"
        sx={{
          height: "6rem",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: theme.palette.surfaceContainer.main,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "unset",
          px: "1rem",
          boxSizing: "border-box",
          alignItems: "center",
          "*": {
            visibility: "visible",
          },
        }}
      >
        <Stack direction="column" spacing={1}>
          <Box height="1.75rem"></Box>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                backgroundColor: theme.palette.surfaceContainerHighest.main,
                borderRadius: "8px",
                py: "0.25rem",
                px: "1rem",
                width: "6rem",
                height: "1.25rem",
              }}
            >
            </Box>
            <SwapHorizOutlinedIcon />
            <Box
              sx={{
                backgroundColor: theme.palette.surfaceContainerLowest.main,
                borderRadius: "8px",
                py: "0.25rem",
                px: "1rem",
                width: "6rem",
                height: "1.25rem",
              }}
            >
            </Box>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box sx={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "1.25rem",
            backgroundColor: theme.palette.surfaceContainerLowest.main,
          }}></Box>
        </Stack>
      </M3Skeleton>
    );
  }

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderRadius: "12px",
        height: "6rem",
        boxSizing: "border-box",
        px: "1rem",
        flexShrink: 0,
      }}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="titleLarge">{movementEntry.targa}</Typography>
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              backgroundColor: theme.palette.surfaceContainerHighest.main,
              borderRadius: "8px",
              py: "0.25rem",
              px: "1rem",
            }}
          >
            <Typography variant="labelLarge">
              {movementEntry.arrivals} arrivi
            </Typography>
          </Box>
          <SwapHorizOutlinedIcon />
          <Box
            sx={{
              backgroundColor: theme.palette.surfaceContainerLowest.main,
              borderRadius: "8px",
              py: "0.25rem",
              px: "1rem",
            }}
          >
            <Typography variant="labelLarge">
              {movementEntry.departures} partenze
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <M3IconButton>
          <DeleteOutlineOutlinedIcon />
        </M3IconButton>
        <M3IconButton
          variant="contained"
          disableElevation={true}
          sx={{
            backgroundColor: theme.palette.surfaceContainerLowest.main,
          }}
        >
          <EditOutlinedIcon />
        </M3IconButton>
      </Stack>
    </Stack>
  );
}

type MovementEntryDialogProps = {
  locations: string[],
  open: boolean,
  onClose: () => void,
  floating: "right" | "left",
  entry?: MovementEntry,
  onAcceptAction: (entry: MovementEntry) => void,
}

function MovementEntryDialog({ locations, open, onClose, floating, entry, onAcceptAction }: MovementEntryDialogProps): JSX.Element {
  const theme = useTheme();

  const [targa, setTarga] = useState<string | null>(null);
  const [arrivals, setArrivals] = useState<number | null>(null);
  const [departures, setDepartures] = useState<number | null>(null);

  const [touchedState, setTouchedState] = useState({
    targa: false,
    arrivals: false,
    departures: false,
  });

  const errors = {
    targa: targa === null,
    arrivals: arrivals === null,
    departures: departures === null,
  };
  const hasErrors = errors.targa || errors.arrivals || errors.departures;
  const showError = {
    targa: errors.targa && touchedState.targa,
    arrivals: errors.arrivals && touchedState.arrivals,
    departures: errors.departures && touchedState.departures,
  };
  const errorText = "Il campo è obbligatorio";

  function acceptAndClose(): void {
    touchForm();
    if (hasErrors) {
      return;
    }

    onAcceptAction({
      targa: targa ?? "",
      arrivals: arrivals ?? 0,
      departures: departures ?? 0,
    });

    clearForm();
    onClose();
  }

  function touchField(field: "targa" | "arrivals" | "departures"): void {
    const newTouchedState = { ...touchedState };
    newTouchedState[field] = true;
    setTouchedState(newTouchedState);
  }

  function touchForm(): void {
    setTouchedState({
      targa: true,
      arrivals: true,
      departures: true,
    });
  }

  function clearForm(): void {
    setTarga(null);
    setArrivals(null);
    setDepartures(null);
    setTouchedState({
      targa: false,
      arrivals: false,
      departures: false,
    });
  }

  function drawNumberValue(value: number | null): string {
    return value === null ? "" : value.toString();
  }

  function updateNumberValue(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: number | null) => void,
    fieldName: "arrivals" | "departures"
  ): void {
    if (event.target.value && event.target.value !== "") {
      const newValue = Number.parseInt(event.target.value);
      setter(Math.max(newValue, 0));
    } else {
      setter(null);
    }
    touchField(fieldName);
  }

  return (
    <M3Dialog
      open={open}
      onClose={onClose}
      heightRem={20}
      transitionDuration={theme.transitions.duration.medium4}
      floating={floating}
    >
      <Stack spacing={3} sx={{ p: "1.5rem", minWidth: "45rem", }}>
        <Stack spacing={4} alignItems="center">
          <AddchartOutlinedIcon />
          <Typography variant="headlineSmall">Aggiungi targa</Typography>
          <Stack direction="row" spacing={1} sx={{
            width: "100%",
            height: "5rem",
          }}>
            <TargaAutocomplete
              id="targa"
              defaultValue={entry?.targa}
              options={locations}
              value={targa}
              onChange={(_, value) => {
                if (typeof(value) === "string") {
                  setTarga(value);
                }
                touchField("targa");
              }}
              onInputChange={(_e, _v, reason) => {
                if (reason !== "reset") {
                  touchField("targa");
                }
              }}
              onHighlightChange={() => touchField("targa")}
              renderInput={(params) => <TextField
                {...params}
                fullWidth
                error={showError.targa}
                helperText={showError.targa ? errorText : undefined}
                size="medium"
                label="Targa" />}
            />
            <TextField
              fullWidth
              error={showError.arrivals}
              helperText={showError.arrivals ? errorText : undefined}
              value={drawNumberValue(arrivals)}
              onChange={event => updateNumberValue(event, setArrivals, "arrivals")}
              id="arrivi"
              type="number"
              inputProps={{ min: 0 }}
              defaultValue={entry?.arrivals}
              label="Arrivi"
            ></TextField>
            <TextField
              fullWidth
              error={showError.departures}
              helperText={showError.departures ? errorText : undefined}
              value={drawNumberValue(departures)}
              onChange={event => updateNumberValue(event, setDepartures, "departures")}
              id="partenze"
              type="number"
              inputProps={{ min: 0 }}
              defaultValue={entry?.departures}
              label="Partenze"
            ></TextField>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{
            width: "100%",
          }}>
            <M3TextButton onClick={onClose}>Cancella</M3TextButton>
            <M3FilledButton onClick={acceptAndClose}>Accetta</M3FilledButton>
          </Stack>
        </Stack>
      </Stack>
    </M3Dialog>
  );
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
