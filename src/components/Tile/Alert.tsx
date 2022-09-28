import React, { ReactNode, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import { useAppSelector } from "../../redux/hooks";
import { TileContext } from "./context";
import { TileData } from "../../redux/tilesSlice";
import { RoomType } from "../../redux/roomTypesSlice";

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
  const occupancy = useAppSelector((state) => assignedRoomType ? state.roomTypes.data[assignedRoomType] : undefined);
  const badgeColor = useBadgeColor(data, occupancy, assignedRoomType);

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
    for (const floorId in state.hotel.data) {
      const floor = state.hotel.data[floorId];
      for (const roomId in floor.rooms) {
        const room = floor.rooms[roomId];
        if (room.number === roomNumber) {
          return room.type;
        }
      }
    }
  });
}

function useBadgeColor(data: TileData, occupancy: RoomType | undefined, assignedRoomType: string | undefined): string {
  const theme = useTheme();

  if (occupancy) {
    if ((data.persons < occupancy.minOccupancy) || (data.persons > occupancy.maxOccupancy)) {
      return theme.palette.error.light;
    } else if (assignedRoomType !== data.roomType) {
      return theme.palette.warning.dark;
    }
  }

  return "";
}
