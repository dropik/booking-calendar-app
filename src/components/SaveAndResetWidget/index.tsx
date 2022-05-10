import React, { createContext, useState } from "react";

import ActionButtons from "./ActionButtons";
import SavedNotification from "./SavedNotification";
import SavingNotification from "./SavingNotification";

type Status = "idle" | "loading" | "fulfilled";

type SaveAndResetWidgetContextProps = {
  status: Status,
  setStatus: (newStatus: Status) => void
};

export const SaveAndResetWidgetContext = createContext<SaveAndResetWidgetContextProps>({
  status: "idle",
  setStatus: () => void 0
});

export default function SaveAndResetWidget(): JSX.Element {
  const [status, setStatus] = useState<Status>("idle");

  const context: SaveAndResetWidgetContextProps = {
    status: status,
    setStatus: setStatus
  };

  return (
    <SaveAndResetWidgetContext.Provider value={context}>
      <ActionButtons />
      <SavingNotification />
      <SavedNotification />
    </SaveAndResetWidgetContext.Provider>
  );
}
