import React, { useState, useMemo, memo } from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { api } from "../../../api";
import { MovementEntry, MovementsList } from "./models";

import M3Fab from "../../m3/M3Fab";
import PresenseItem from "./PresenseItem";
import MovementEntryDialog from "./MovementEntryDialog";

type PresenseListProps = {
  title: string;
  list: MovementsList;
  dialogFloating: "right" | "left",
  isItaly: boolean,
  onEntryAdd: (entry: MovementEntry) => void,
  onEntryEdit: (entry: MovementEntry) => void,
  onEntryDelete: (id: string) => void,
};

export default memo(function PresenseList({ title, list, dialogFloating, isItaly, onEntryAdd, onEntryEdit, onEntryDelete }: PresenseListProps): JSX.Element {
  const theme = useTheme();
  const [scrollTop, setScrollTop] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const { data: provinces } = api.endpoints.getProvinces.useQuery(null, { skip: !isItaly });
  const { data: countries } = api.endpoints.getCountries.useQuery(null, { skip: isItaly });
  const locations: string[] = provinces ?? countries ?? [];
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

  const items = useMemo(() => itemsKeys.map((key) => {
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
  }), [dialogFloating, itemsKeys, list, onEntryDelete, onEntryEdit, usableLocations]);

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
          spacing={0}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            p: "1rem",
            pb: 0,
            overflowY: "auto",
          }}
          onScroll={(event) => {
            setScrollTop(event.currentTarget?.scrollTop ?? 0);
          }}
        >
          {items}
        </Stack>
      </Box>
    </Stack>
  );
});
