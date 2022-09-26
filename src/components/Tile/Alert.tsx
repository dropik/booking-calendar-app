import React, { ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import { useAppSelector } from "../../redux/hooks";
import { TileContext } from "./context";
import { TileData } from "../../redux/tilesSlice";

type AlertProps = {
  children: ReactNode
};

export default function Alert({ children }: AlertProps): JSX.Element {
  const { data } = useContext(TileContext);

  if (!data) {
    return <>{children}</>;
  }

  return <AlertWrappee data={data}>{children}</AlertWrappee>;
}

type AlertWrappeeProps = {
  children: ReactNode,
  data: TileData
}

function AlertWrappee({ children, data }: AlertWrappeeProps): JSX.Element {
  const { cropRight } = useContext(TileContext);
  const assignedRoomType = useAssignedRoomType(data.roomNumber);
  const personsInAssignedRoomType = useAppSelector((state) => assignedRoomType ? state.roomTypes.data[assignedRoomType] : undefined);
  const badgeColor = useBadgeColor(data, personsInAssignedRoomType, assignedRoomType);

  return (
    <Badge
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
        ...(cropRight && {
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
          ...(cropRight && {
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

function useBadgeColor(data: TileData, personsInAssignedRoomType: number[] | undefined, assignedRoomType: string | undefined): string {
  const theme = useTheme();

  if (personsInAssignedRoomType) {
    if (!personsInAssignedRoomType.includes(data.persons)) {
      return theme.palette.error.light;
    } else if (assignedRoomType !== data.roomType) {
      return theme.palette.warning.dark;
    }
  }

  return "";
}
