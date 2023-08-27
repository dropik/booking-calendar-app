import React, { useContext } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";

import { TileContext } from "./context";

type DepositAlertProps = {
  fontSize?: string,
};

export default function DepositAlert({ fontSize }: DepositAlertProps): JSX.Element {
  const theme = useTheme();
  const { data } = useContext(TileContext);

  const hasDepositError = data && (data.deposit > 0) && !data.depositConfirmed;

  return (
    <Box>
      {hasDepositError
        ? <CreditCardOffIcon sx={{
          fontSize: fontSize,
          color: theme.palette.error.main,
        }} />
        : null }
    </Box>
  );
}
