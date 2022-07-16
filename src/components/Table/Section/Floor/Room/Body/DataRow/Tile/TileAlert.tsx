import React, { ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import { useAppSelector } from "../../../../../../../../redux/hooks";
import { TileContext } from "./context";

type Props = {
  children: ReactNode
};

export default function TileAlert({ children }: Props): JSX.Element {
  const context = useContext(TileContext);
  const assignedRoomType = useAssignedRoomType(context.data.roomNumber);
  const personsInAssignedRoomType = useAppSelector((state) => assignedRoomType ? state.roomTypes.data[assignedRoomType] : undefined);
  const badgeColor = useBadgeColor(personsInAssignedRoomType, assignedRoomType);

  return (
    <Badge
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
        ...(context.cropRight && {
          horizontal: "left"
        })
      }}
      badgeContent=" "
      variant="dot"
      sx={{
        display: "block",
        "& .MuiBadge-badge": {
          backgroundColor: badgeColor,
          top: "0.75rem",
          right: "0.75rem",
          ...(context.cropRight && {
            right: "auto",
            left: "0.75rem"
          })
        }
      }}
    >
      {children}
    </Badge>
  );
}

function useAssignedRoomType(roomNumber: number | undefined): string | undefined {
  return useAppSelector((state) => {
    for (const floor of state.hotel.data.floors) {
      for (const room of floor.rooms) {
        if (room.number === roomNumber) {
          return room.type;
        }
      }
    }
  });
}

function useBadgeColor(personsInAssignedRoomType: number[] | undefined, assignedRoomType: string | undefined): string {
  const theme = useTheme();
  const context = useContext(TileContext);

  if (personsInAssignedRoomType) {
    if (!personsInAssignedRoomType.includes(context.data.persons)) {
      return theme.palette.error.light;
    } else if (assignedRoomType !== context.data.roomType) {
      return theme.palette.warning.dark;
    }
  }

  return "";
}
