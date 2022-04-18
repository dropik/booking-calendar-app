import React, { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import "./ConnectionError.css";

export default function ConnectionError(): JSX.Element {
  const dispatch = useAppDispatch();
  const showError = useAppSelector((state) => state.connectionError.showError);
  const ref = useRef<HTMLDivElement>(null);

  function handleAnimationEnd() {
    if (ref.current) {
      const classList = ref.current.classList;
      if (classList.contains("clip1")) {
        classList.remove("clip1");
      } else if (classList.contains("clip2")) {
        dispatch(ConnectionErrorSlice.hide());
      }
    }
  }

  if (showError) {
    return <div ref={ref} onAnimationEnd={handleAnimationEnd} className="connection-error clip1 clip2">Errore di connessione</div>;
  }

  return <></>;
}
