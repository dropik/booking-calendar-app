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
import M3TextButton from "../m3/M3TextButton";
import M3IconButton from "../m3/M3IconButton";
import M3FilledButton from "../m3/M3FilledButton";
import M3Fab from "../m3/M3Fab";

import {
  fetchCountriesAsync,
  fetchIstatMovementsAsync,
  fetchProvincesAsync,
  postIstatMovementsAsync,
  MovementDTO,
} from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";

type MovementEntry = {
  id: string;
  targa?: string;
  arrivals?: number;
  departures?: number;
};

type MovementsList = {
  [key: string]: MovementEntry,
};

export default function Istat(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [movementsData, setMovementsData] = useState<MovementDTO | undefined>(undefined);
  const [italians, setItalians] = useState<MovementsList>({
    placeholder1: { id: "placeholder1" },
    placeholder2: { id: "placeholder2" },
  });
  const [foreigns, setForeigns] = useState<MovementsList>({
    placeholder1: { id: "placeholder1" },
    placeholder2: { id: "placeholder2" },
  });
  const [isSending, setIsSending] = useState(false);

  const italianKeys = Object.keys(italians);
  const foreignKeys = Object.keys(foreigns);

  const isLoaded = italianKeys.every(key => key.search("placeholder") < 0) && foreignKeys.every(key => key.search("placeholder") < 0);
  let totalArrivals = 0;
  let totalDepartures = 0;
  for (const key of italianKeys) {
    const entry = italians[key];
    totalArrivals += entry.arrivals ?? 0;
    totalDepartures += entry.departures ?? 0;
  }
  for (const key of foreignKeys) {
    const entry = foreigns[key];
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
    const copy = {...italians};
    entry.id = self.crypto.randomUUID();
    copy[entry.id] = entry;
    setItalians(copy);
  }

  function editItalianEntry(entry: MovementEntry): void {
    const copy = {...italians};
    copy[entry.id] = entry;
    setItalians(copy);
  }

  function deleteItalianEntry(id: string): void {
    const copy = {...italians};
    delete copy[id];
    setItalians(copy);
  }

  function addForeignEntry(entry: MovementEntry): void {
    const copy = {...foreigns};
    entry.id = self.crypto.randomUUID();
    copy[entry.id] = entry;
    setForeigns(copy);
  }

  function editForeignEntry(entry: MovementEntry): void {
    const copy = {...foreigns};
    copy[entry.id] = entry;
    setForeigns(copy);
  }

  function deleteForeignEntry(id: string): void {
    const copy = {...foreigns};
    delete copy[id];
    setForeigns(copy);
  }

  function sendData(): void {
    async function sendAsync(): Promise<void> {
      if (!movementsData) {
        return;
      }

      const dto: MovementDTO = {
        date: movementsData.date,
        prevTotal: movementsData.prevTotal,
        movements: [],
      };

      for (const key in italians) {
        const entry = italians[key];
        dto.movements.push({
          italia: true,
          targa: entry.targa ?? "",
          arrivi: entry.arrivals ?? 0,
          partenze: entry.departures ?? 0,
        });
      }

      for (const key in foreigns) {
        const entry = foreigns[key];
        dto.movements.push({
          italia: false,
          targa: entry.targa ?? "",
          arrivi: entry.arrivals ?? 0,
          partenze: entry.departures ?? 0,
        });
      }

      try {
        await postIstatMovementsAsync(dto);
        dispatch(showSnackbarMessage({ type: "success", message: "I dati sono stati mandati correttamente!" }));
        navigate(-1);
      } catch (exception: any) {
        dispatch(showSnackbarMessage({ type: "error", message: `Errore durante elaborazione dei dati: ${exception}`}));
        setIsSending(false);
      }
    }

    if (!isSending) {
      setIsSending(true);
      sendAsync();
    }
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
            isSending ? (
              <CircularProgress />
            ) : (
              <M3FilledButton onClick={sendData} startIcon={<CheckOutlinedIcon />}>
              Accetta
              </M3FilledButton>
            )) : <></>}
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
              onEntryEdit={editItalianEntry}
              onEntryDelete={deleteItalianEntry}
            />
            <PresenseList
              title="Stranieri"
              list={foreigns}
              dialogFloating="right"
              fetchLocations={fetchCountriesAsync}
              onEntryAdd={addForeignEntry}
              onEntryEdit={editForeignEntry}
              onEntryDelete={deleteForeignEntry}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

function splitMovements(movements: MovementDTO): { italians: MovementsList; foreigns: MovementsList } {
  const italians: MovementsList = {};
  const foreigns: MovementsList = {};

  for (let i = 0; i < movements.movements.length; i++) {
    const movement = movements.movements[i];
    const key = self.crypto.randomUUID();
    if (movement.italia) {
      italians[key] = {
        id: key,
        targa: movement.targa,
        arrivals: movement.arrivi,
        departures: movement.partenze,
      };
    } else {
      foreigns[key] = {
        id: key,
        targa: movement.targa,
        arrivals: movement.arrivi,
        departures: movement.partenze,
      };
    }
  }

  return { italians, foreigns };
}

type PresenseListProps = {
  title: string;
  list: MovementsList;
  dialogFloating: "right" | "left",
  fetchLocations: () => Promise<{data: string[] }>,
  onEntryAdd: (entry: MovementEntry) => void,
  onEntryEdit: (entry: MovementEntry) => void,
  onEntryDelete: (id: string) => void,
};

function PresenseList({ title, list, dialogFloating, fetchLocations, onEntryAdd, onEntryEdit, onEntryDelete }: PresenseListProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [scrollTop, setScrollTop] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const isScrolled = scrollTop > 0;

  const itemsKeys = Object.keys(list);

  const usedTarga: string[] = [];
  for (const key in list) {
    const entry = list[key];
    usedTarga.push(entry.targa ?? "");
  }

  const usableLocations = locations.filter(l => !usedTarga.includes(l));
  const isLoaded = itemsKeys.every(key => key.search("placeholder") < 0) && locations.length > 0;

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
          {itemsKeys.map((key) => {
            const item = list[key];
            return (
              <PresenseItem
                key={key}
                entry={item}
                usableLocations={usableLocations}
                dialogFloating={dialogFloating}
                onEntryEdit={onEntryEdit}
                onEntryDelete={onEntryDelete}
              />
            );
          })}
        </Stack>
      </Box>
    </Stack>
  );
}

type PresenseItemProps = {
  entry: MovementEntry,
  usableLocations: string[],
  dialogFloating: "right" | "left",
  onEntryEdit: (entry: MovementEntry) => void,
  onEntryDelete: (id: string) => void,
};

function PresenseItem({ entry, usableLocations, dialogFloating, onEntryEdit, onEntryDelete }: PresenseItemProps): JSX.Element {
  const theme = useTheme();
  const [editOpen, setEditOpen] = useState(false);

  if (!entry.targa) {
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
        <Typography variant="titleLarge">{entry.targa}</Typography>
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
              {entry.arrivals} arrivi
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
              {entry.departures} partenze
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <M3IconButton onClick={() => onEntryDelete(entry.id)}>
          <DeleteOutlineOutlinedIcon />
        </M3IconButton>
        <M3IconButton
          variant="contained"
          disableElevation={true}
          onClick={() => setEditOpen(true)}
          sx={{
            backgroundColor: theme.palette.surfaceContainerLowest.main,
          }}
        >
          <EditOutlinedIcon />
        </M3IconButton>
        <MovementEntryDialog
          locations={usableLocations}
          open={editOpen}
          onClose={() => setEditOpen(false)}
          floating={dialogFloating}
          entry={entry}
          onAcceptAction={onEntryEdit} />
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

  const usableLocations = !entry ? locations : [...locations, entry.targa];
  usableLocations.sort();

  const [targa, setTarga] = useState<string | null>(entry?.targa ?? null);
  const [arrivals, setArrivals] = useState<number | null>(entry?.arrivals ?? null);
  const [departures, setDepartures] = useState<number | null>(entry?.departures ?? null);

  const [touchedState, setTouchedState] = useState({
    targa: false,
    arrivals: false,
    departures: false,
  });

  const requiredText = "Il campo è obbligatorio";
  const zeroArrivalAndDepartureText = "Almeno arrivi o partenze devono essere presenti";
  const errors = {
    targa: targa === null ? requiredText : undefined,
    arrivals: arrivals === null ? requiredText : (
      arrivals === 0 && departures === 0 ? zeroArrivalAndDepartureText : undefined
    ),
    departures: departures === null ? requiredText : (
      arrivals === 0 && departures === 0 ? zeroArrivalAndDepartureText : undefined
    ),
  };
  const showError = {
    targa: touchedState.targa && Boolean(errors.targa),
    arrivals: touchedState.arrivals && Boolean(errors.arrivals),
    departures: touchedState.departures && Boolean(errors.departures),
  };
  const hasErrors = errors.targa || errors.arrivals || errors.departures;

  function acceptAndClose(): void {
    touchForm();
    if (hasErrors) {
      return;
    }

    onAcceptAction({
      id: entry?.id ?? "",
      targa: targa ?? "",
      arrivals: arrivals ?? 0,
      departures: departures ?? 0,
    });

    if (!entry) {
      clearForm();
    }

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
              options={usableLocations}
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
                helperText={showError.targa ? errors.targa : undefined}
                size="medium"
                label="Targa" />}
            />
            <TextField
              fullWidth
              error={showError.arrivals}
              helperText={showError.arrivals ? errors.arrivals : undefined}
              value={drawNumberValue(arrivals)}
              onChange={event => updateNumberValue(event, setArrivals, "arrivals")}
              id="arrivi"
              type="number"
              inputProps={{ min: 0 }}
              label="Arrivi"
            ></TextField>
            <TextField
              fullWidth
              error={showError.departures}
              helperText={showError.departures ? errors.departures : undefined}
              value={drawNumberValue(departures)}
              onChange={event => updateNumberValue(event, setDepartures, "departures")}
              id="partenze"
              type="number"
              inputProps={{ min: 0 }}
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
