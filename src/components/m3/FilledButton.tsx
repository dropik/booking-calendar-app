import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
  color: theme.palette.onPrimary.main,
}));

export default function FilledButton(props: ButtonProps): JSX.Element {
  return (
    <CustomizedButton {...props} variant="contained">
      <Typography variant="labelLarge">
        {props.children}
      </Typography>
    </CustomizedButton>
  );
}
