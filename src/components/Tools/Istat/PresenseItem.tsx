import React, { memo, useEffect, useRef, useState } from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import M3Skeleton from "../../m3/M3Skeleton";
import M3IconButton from "../../m3/M3IconButton";

import { MovementEntry } from "./models";
import MovementEntryDialog from "./MovementEntryDialog";

type PresenseItemProps = {
  entry: MovementEntry,
  usableLocations: string[],
  dialogFloating: "right" | "left",
  onEntryEdit: (entry: MovementEntry) => void,
  onEntryDelete: (id: string) => void,
};

export default memo(function PresenseItem({ entry, usableLocations, dialogFloating, onEntryEdit, onEntryDelete }: PresenseItemProps): JSX.Element {
  const theme = useTheme();
  const [editOpen, setEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDeleting && containerRef.current) {
      containerRef.current?.style.setProperty("height", "0px");
    }
  }, [isDeleting]);

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
          mb: "1rem",
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
      ref={containerRef}
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.surfaceContainer.main,
        borderRadius: "12px",
        height: "6rem",
        boxSizing: "border-box",
        px: "1rem",
        mb: "1rem",
        flexShrink: 0,
        ...(isDeleting && {
          visibility: "hidden",
          transition: theme.transitions.create(["height", "margin-bottom"], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.emphasized
          }),
          mb: 0,
        }),
      }}
      onTransitionEnd={() => {
        if (isDeleting) {
          onEntryDelete(entry.id);
        }
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
        <M3IconButton onClick={() => {
          if (!isDeleting) {
            setIsDeleting(true);
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              containerRef.current.style.setProperty("height", `${rect.height}px`);
            }
          }
        }}>
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
});
