import React, { useState, useEffect, useMemo, useCallback } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import M3FilledButton from "../../m3/M3FilledButton";
import M3Skeleton from "../../m3/M3Skeleton";

import { useAppDispatch } from "../../../redux/hooks";
import { show as showSnackbarMessage } from "../../../redux/snackbarMessageSlice";

import { api, MovementDTO } from "../../../api";

import { MovementEntry, MovementsList } from "./models";
import PresenseList from "./PresenseList";
import NegativePresenseDialog from "./NegativePresenseDialog";
import M3Page from "../../m3/M3Page";
import M3DrawerAdjacent from "../../m3/M3DrawerAdjacent";

export default function Istat(): JSX.Element {
  const dispatch = useAppDispatch();
  const { data: loadedMovements, isSuccess, isFetching } = api.endpoints.getIstatMovements.useQuery(null, { refetchOnMountOrArgChange: true });
  const [postIstat, postIstatResult] = api.endpoints.postIstat.useMutation();
  const [italians, setItalians] = useState<MovementsList>({
    placeholder1: { id: "placeholder1" },
    placeholder2: { id: "placeholder2" },
  });
  const [foreigns, setForeigns] = useState<MovementsList>({
    placeholder1: { id: "placeholder1" },
    placeholder2: { id: "placeholder2" },
  });
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const italianKeys = Object.keys(italians);
  const foreignKeys = Object.keys(foreigns);

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
    loadedMovements?.prevTotal === undefined
      ? undefined
      : loadedMovements.prevTotal + totalArrivals - totalDepartures;

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

  useEffect(() => {
    if (isSuccess && !isFetching) {
      const { italians: newItalians, foreigns: newForeigns } = splitMovements(loadedMovements);
      setItalians(newItalians);
      setForeigns(newForeigns);
    }

    return () => {
      setItalians({
        placeholder1: { id: "placeholder1" },
        placeholder2: { id: "placeholder2" },
      });
      setForeigns({
        placeholder1: { id: "placeholder1" },
        placeholder2: { id: "placeholder2" },
      });
    };
  }, [isSuccess, loadedMovements, isFetching]);

  function sendData(): void {
    if (!isSuccess) {
      return;
    }

    const dto: MovementDTO = {
      date: loadedMovements.date,
      prevTotal: loadedMovements.prevTotal,
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

    if (!postIstatResult.isLoading) {
      if (nextTotal !== undefined && nextTotal < 0) {
        setOpenErrorDialog(true);
      } else {
        postIstat(dto);
      }
    }
  }

  function onBeforePageExited(): boolean {
    if (loadedMovements && checkDataWasTouched(loadedMovements, italians, foreigns)) {
      return false;
    }
    return true;
  }

  function onPageExited(): void {
    dispatch(showSnackbarMessage({ type: "success", message: "I dati sono stati mandati correttamente!" }));
  }

  const italianList = useMemo(() => (
    <PresenseList
      title="Italiani"
      list={italians}
      dialogFloating="left"
      isItaly={true}
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
      isItaly={false}
      onEntryAdd={addForeignEntry}
      onEntryEdit={editForeignEntry}
      onEntryDelete={deleteForeignEntry}
    />
  ), [addForeignEntry, deleteForeignEntry, editForeignEntry, foreigns]);

  return (
    <M3DrawerAdjacent>
      <M3Page
        topBarElement={(isEntered) =>
          !isFetching ? (
            postIstatResult.isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {isEntered ? (
                  <M3FilledButton onClick={sendData} startIcon={<CheckOutlinedIcon />}>
                Accetta
                  </M3FilledButton>
                ) : null}
                <NegativePresenseDialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)} />
              </>
            )) : <></>
        }
        exit={postIstatResult.isSuccess}
        onExited={onPageExited}
        onBeforeExit={onBeforePageExited}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py="1rem"
        >
          <Typography variant="displaySmall">ISTAT</Typography>
          <Stack direction="column" alignItems="flex-end">
            <Typography variant="titleLarge">{(isFetching || !isSuccess) ? <M3Skeleton width="8rem" /> : loadedMovements.date}</Typography>
            <Typography variant="titleMedium">
              {(isFetching || !isSuccess) ? <M3Skeleton width="12rem" /> : `${loadedMovements.prevTotal} presenze precedenti`}
            </Typography>
            <Typography variant="titleMedium">
              {(isFetching || !isSuccess) ? <M3Skeleton width="12rem" /> : `${nextTotal} presenze attuali`}
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
      </M3Page>
    </M3DrawerAdjacent>
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

function checkDataWasTouched(originalDTO: MovementDTO, italians: MovementsList, foreigns: MovementsList): boolean {
  const originalLists = splitMovements(originalDTO);

  return checkListWasTouched(originalLists.italians, italians) ||
    checkListWasTouched(originalLists.foreigns, foreigns);
}

function checkListWasTouched(original: MovementsList, current: MovementsList): boolean {
  const originalKeys = Object.keys(original);
  const currentKeys = Object.keys(current);

  if (currentKeys.every(k => k.indexOf("placeholder") >= 0)) {
    return false;
  }

  if (originalKeys.length !== currentKeys.length) {
    return true;
  }

  for (let i = 0; i < originalKeys.length; i++) {
    const originalEntry = original[originalKeys[i]];
    const currentEntry = current[currentKeys[i]];
    if (originalEntry.targa !== currentEntry.targa ||
      originalEntry.arrivals !== currentEntry.arrivals ||
      originalEntry.departures !== currentEntry.departures) {
      return true;
    }
  }

  return false;
}
