import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon icon={faCircleExclamation} />
      {text}
    </div>
  );
}
