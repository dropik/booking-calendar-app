/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import M3IconButton from "../../m3/M3IconButton";
import M3FilledButton from "../../m3/M3FilledButton";
import M3Skeleton from "../../m3/M3Skeleton";

import { useAppDispatch } from "../../../redux/hooks";
import { show as showSnackbarMessage } from "../../../redux/snackbarMessageSlice";

import {
  fetchCountriesAsync,
  fetchIstatMovementsAsync,
  fetchProvincesAsync,
  postIstatMovementsAsync,
  MovementDTO,
} from "../../../api";

import { MovementEntry, MovementsList } from "./models";
import PresenseList from "./PresenseList";

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

  const addItalianEntry = useCallback((entry: MovementEntry) => {
    const copy = {...italians};
    entry.id = self.crypto.randomUUID();
    copy[entry.id] = entry;
    setItalians(copy);
  }, [italians]);

  const editItalianEntry = useCallback((entry: MovementEntry) => {
    const copy = {...italians};
    copy[entry.id] = entry;
    setItalians(copy);
  }, [italians]);

  const deleteItalianEntry = useCallback((id: string) => {
    const copy = {...italians};
    delete copy[id];
    setItalians(copy);
  }, [italians]);

  const addForeignEntry = useCallback((entry: MovementEntry) => {
    const copy = {...foreigns};
    entry.id = self.crypto.randomUUID();
    copy[entry.id] = entry;
    setForeigns(copy);
  }, [foreigns]);

  const editForeignEntry = useCallback((entry: MovementEntry) => {
    const copy = {...foreigns};
    copy[entry.id] = entry;
    setForeigns(copy);
  }, [foreigns]);

  const deleteForeignEntry = useCallback((id: string) => {
    const copy = {...foreigns};
    delete copy[id];
    setForeigns(copy);
  }, [foreigns]);

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

  const italianList = useMemo(() => (
    <PresenseList
      title="Italiani"
      list={italians}
      dialogFloating="left"
      fetchLocations={fetchProvincesAsync}
      onEntryAdd={addItalianEntry}
      onEntryEdit={editItalianEntry}
      onEntryDelete={deleteItalianEntry}
    />
  ), [addItalianEntry, deleteItalianEntry, editItalianEntry, italians]);

  const foreignList = useMemo(() => (
    <PresenseList
      title="Stranieri"
      list={foreigns}
      dialogFloating="right"
      fetchLocations={fetchCountriesAsync}
      onEntryAdd={addForeignEntry}
      onEntryEdit={editForeignEntry}
      onEntryDelete={deleteForeignEntry}
    />
  ), [addForeignEntry, deleteForeignEntry, editForeignEntry, foreigns]);

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
            {italianList}
            {foreignList}
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
