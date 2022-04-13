import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type Props = {
  show: boolean,
  text: string
};

function ErrorLabel({ show, text }: Props): JSX.Element {
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

export default hot(module)(ErrorLabel);
