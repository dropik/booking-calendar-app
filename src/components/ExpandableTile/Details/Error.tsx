import React, { useContext } from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";

import { useAppSelector } from "../../../redux/hooks";
import { TileContext } from "../../Tile/context";
import { TileData } from "../../../redux/tilesSlice";

export default function Error(): JSX.Element | null {
  const { data } = useContext(TileContext);

  if (!data) {
    return null;
  }

  return <ErrorWrappee tile={data} />;
}

type ErrorWrappeeProps = {
  tile: TileData
};

function ErrorWrappee({ tile }: ErrorWrappeeProps): JSX.Element | null {
  const theme = useTheme();
  const errorType: "none" | "warning" | "error" = useErrorType(tile);
  const { errorColor, errorMsg } = useErrorParams(errorType);
  const hasDepositError = (tile.deposit > 0) && !tile.depositConfirmed;

  return (
    <Stack spacing={1} direction="column">
      {errorType !== "none" ? (
        <Stack spacing={1} direction="row" sx={{
          color: errorColor,
          alignItems: "center",
        }}>
          <ErrorOutlineOutlined />
          <Typography variant="bodySmall">{errorMsg}</Typography>
        </Stack>
      ) : null}
      {hasDepositError ? (
        <Stack spacing={1} direction="row" sx={{
          color: theme.palette.error.main,
          alignItems: "center",
        }}>
          <ErrorOutlineOutlined />
          <Typography variant="bodySmall">
            Il bonifico non è stato confermato
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
}

function useErrorParams(errorType: "none" | "warning" | "error"): { errorColor: string, errorMsg: string} {
  const theme = useTheme();

  return errorType === "error" ?
    {
      errorColor: theme.palette.error.light,
      errorMsg: "La stanza assegnata all'occupazione non è dedicata a questa quantità degli ospiti."
    }:
    {
      errorColor: theme.palette.warning.dark,
      errorMsg: "La tipologia della stanza assegnata non coincide con quella richiesta dall'occupazione."
    };
}

function useErrorType(tile: TileData): "none" | "warning" | "error" {
  const roomTypeName: string = useAppSelector(state =>
    tile.roomId === undefined
      ? ""
      : state.rooms.data[tile.roomId]?.type ?? "");
  const roomType = useAppSelector(state => state.roomTypes.data[roomTypeName]);

  if (tile.roomId === undefined) {
    return "none";
  }

  if (roomTypeName === "") {
    return "none";
  }

  if (!roomType) {
    return "none";
  }

  if ((tile.persons < roomType.minOccupancy) || (tile.persons > roomType.maxOccupancy)) {
    return "error";
  }
  if (roomTypeName !== tile.roomType) {
    return "warning";
  }
  return "none";
}
