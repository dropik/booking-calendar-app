import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

type Props = {
  show: boolean,
  text: string
};

export default function ErrorLabel({ show, text }: Props): JSX.Element {
  if (!show) {
    return <></>;
  }

  return (
    <div className="error-label">
      <ErrorIcon fontSize="small" />
      {text}
    </div>
  );
}
