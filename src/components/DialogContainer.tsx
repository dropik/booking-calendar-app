import React, { createContext, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as DialogSlice from "../redux/dialogSlice";

import Dialog from "./dialogs/Dialog";
import DialogSwitch from "./dialogs/DialogSwitch";

import "./Dialog.css";

export type DialogContextType = {
  index: number,
  lastIndex: number,
  fadeOutDialog: () => void
};
export const DialogContext = createContext<DialogContextType>({ index: 0, lastIndex: 0, fadeOutDialog: () => void 0 });

function DialogContainer(): JSX.Element {
  const dispatch = useAppDispatch();
  const dialogs = useAppSelector((state) => state.dialog.dialogs);
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


  if (dialogs.length === 0) {
    return <></>;
  }

  const dialogComponents: JSX.Element[] = dialogs.map((dialog, index) => (
    <DialogContext.Provider key={index} value={{ index: index, lastIndex: dialogs.length - 1, fadeOutDialog }}>
      <Dialog>
        <DialogSwitch dialog={dialog} />
      </Dialog>
    </DialogContext.Provider>
  ));


  return (
    <div
      ref={ref}
      className="dialog-container show"
      onClick={fadeOutDialog}
      onAnimationEnd={handleDialogAnimationEnd}
    >
      {dialogComponents}
    </div>
  );
}

export default hot(module)(DialogContainer);
