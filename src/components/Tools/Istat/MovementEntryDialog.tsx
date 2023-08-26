import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

import M3Dialog from "../../m3/M3Dialog";
import M3TextButton from "../../m3/M3TextButton";
import M3FilledButton from "../../m3/M3FilledButton";
import M3TargaAutocomplete from "../../m3/M3TargaAutocomplete";

import { MovementEntry } from "./models";

type MovementEntryDialogProps = {
  locations: string[],
  open: boolean,
  onClose: () => void,
  floating: "right" | "left",
  entry?: MovementEntry,
  onAcceptAction: (entry: MovementEntry) => void,
};

export default function MovementEntryDialog({ locations, open, onClose, floating, entry, onAcceptAction }: MovementEntryDialogProps): JSX.Element {
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
            <M3TargaAutocomplete
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
