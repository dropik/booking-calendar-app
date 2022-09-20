import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorOutlineOutlined from "@mui/icons-material/ErrorOutlineOutlined";

import { useErrorType } from "../../../redux/hooks";
import { TileContext } from "../../Tile/context";

export default function Error(): JSX.Element | null {
  const { data } = useContext(TileContext);
  const errorType = useErrorType(data.id);
  const { errorColor, errorMsg } = useErrorParams(errorType);

  if (errorType === "none") {
    return null;
  }

  return (
    <Stack spacing={1} direction="row" sx={{
      color: errorColor,
      alignItems: "center"
    }}>
      <ErrorOutlineOutlined />
      <Typography variant="bodySmall">{errorMsg}</Typography>
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
