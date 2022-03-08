import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector } from "../../redux/hooks";

import "./SaveAndReset.css";

function SaveAndReset(): JSX.Element {
  const hasChanges = useHasChanges();

  if (!hasChanges) {
    return <></>;
  }

  return (
    <div className="save-and-reset">
      <div className="button reset">
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div className="button save">Salva</div>
    </div>
  );
}

function useHasChanges(): boolean {
  return useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);
}

export default hot(module)(SaveAndReset);
