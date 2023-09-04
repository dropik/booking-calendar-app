import React, { createContext } from "react";

import { AssignmentsRequest, api } from "../../api";

import ActionButtons from "./ActionButtons";
import SavedNotification from "./SavedNotification";
import SavingNotification from "./SavingNotification";

type SaveAndResetWidgetContextProps = {
  postAssignments: (request: AssignmentsRequest) => void,
  status: {
    isLoading: boolean,
    isSuccess: boolean,
    reset: () => void,
  },
};

export const SaveAndResetWidgetContext = createContext<SaveAndResetWidgetContextProps>({
  postAssignments: () => void 0,
  status: {
    isLoading: false,
    isSuccess: false,
    reset: () => void 0,
  },
});

export default function SaveAndResetWidget(): JSX.Element {
  const [postAssignments, postAssignmentsResult] = api.endpoints.postAssignments.useMutation();

  const context: SaveAndResetWidgetContextProps = {
    postAssignments: postAssignments,
    status: postAssignmentsResult,
  };

  return (
    <SaveAndResetWidgetContext.Provider value={context}>
      <ActionButtons />
      <SavingNotification />
      <SavedNotification />
    </SaveAndResetWidgetContext.Provider>
  );
}
