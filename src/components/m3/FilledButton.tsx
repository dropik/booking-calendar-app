import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomizedButton = styled(Button)<ButtonProps>(({ theme }) => ({

}));

export default function FilledButton(props: ButtonProps): JSX.Element {
  return <CustomizedButton {...props} variant="contained" />;
}
