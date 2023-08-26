/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import M3Fab from "../../m3/M3Fab";

import { useAppDispatch } from "../../../redux/hooks";
import { show as showSnackbarMessage } from "../../../redux/snackbarMessageSlice";

import { MovementEntry, MovementsList } from "./models";
import PresenseItem from "./PresenseItem";
import MovementEntryDialog from "./MovementEntryDialog";

type PresenseListProps = {
  title: string;
  list: MovementsList;
  dialogFloating: "right" | "left",
  fetchLocations: () => Promise<{data: string[] }>,
  onEntryAdd: (entry: MovementEntry) => void,
  onEntryEdit: (entry: MovementEntry) => void,
  onEntryDelete: (id: string) => void,
};

export default function PresenseList({ title, list, dialogFloating, fetchLocations, onEntryAdd, onEntryEdit, onEntryDelete }: PresenseListProps): JSX.Element {
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
