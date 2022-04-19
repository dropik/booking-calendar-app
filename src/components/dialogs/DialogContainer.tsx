import React, { createContext, ReactNode, useRef } from "react";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

export type DialogContainerContextType = {
  fadeOutDialog: () => void
};
export const DialogContainerContext = createContext<DialogContainerContextType>({ fadeOutDialog: () => void 0 });

type Props = {
  children: ReactNode
}

export default function DialogContainer({ children }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  function closeAllDialogs() {
    dispatch(DialogSlice.closeAll());
  }

  function handleDialogAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    const classList = event.currentTarget.classList;
    if (classList.contains("show")) {
      classList.remove("show");
    } else if (classList.contains("hide")) {
      closeAllDialogs();
    }
  }

  function fadeOutDialog() {
    if (ref.current) {
      ref.current.classList.add("hide");
    }
  }

  return (
    <DialogContainerContext.Provider value={{ fadeOutDialog }}>
      <div
        ref={ref}
        className="dialog-container show"
        onClick={fadeOutDialog}
        onAnimationEnd={handleDialogAnimationEnd}
      >
        {children}
      </div>
    </DialogContainerContext.Provider>
  );
}
