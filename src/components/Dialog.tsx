import React, { createContext } from "react";

import { useAppSelector } from "../redux/hooks";

import DialogContainer from "./dialogs/DialogContainer";
import Dialog from "./dialogs/Dialog";
import DialogSwitch from "./dialogs/DialogSwitch";

import "./Dialog.css";

export type DialogContextType = {
  index: number,
  lastIndex: number
};
export const DialogContext = createContext<DialogContextType>({
  index: 0,
  lastIndex: 0
});

export default function DialogMaster(): JSX.Element {
  const dialogs = useAppSelector((state) => state.dialog.dialogs);

  if (dialogs.length === 0) {
    return <></>;
  } else if ((dialogs.length === 1) && ((dialogs[0].type === "police") || (dialogs[0].type === "istat"))) {
    return <></>;
  }

  return (
    <DialogContainer>
      {
        dialogs.map((dialog, index) => (
          <DialogContext.Provider key={index} value={{ index: index, lastIndex: dialogs.length - 1 }}>
            <Dialog>
              <DialogSwitch dialog={dialog} />
            </Dialog>
          </DialogContext.Provider>
        ))
      }
    </DialogContainer>
  );
}
