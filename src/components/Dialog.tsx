import React, { createContext } from "react";
import { hot } from "react-hot-loader";

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

function DialogMaster(): JSX.Element {
  const dialogs = useAppSelector((state) => state.dialog.dialogs);

  if (dialogs.length === 0) {
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

export default hot(module)(DialogMaster);
