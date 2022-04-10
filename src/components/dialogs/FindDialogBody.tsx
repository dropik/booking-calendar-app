import React, { createContext, useCallback, useState } from "react";
import { hot } from "react-hot-loader";

import ButtonInput from "./ButtonInput";
import ErrorLabel from "./ErrorLabel";
import LiveUpdateInput from "./LiveUpdateInput";
import HeaderRow from "./HeaderRow";

import "./DialogWithList.css";

export type FindDialogContextType = {
  enableLiveUpdate: () => void,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

export const FindDialogContext = createContext<FindDialogContextType>({
  enableLiveUpdate: () => void 0,
  forceFetchRequest: 0,
  isLiveUpdateEnabled: false,
  isValidated: true
});

type Props = {
  isValidated: boolean,
  errorText: string,
  formInputs: (showError: boolean) => JSX.Element,
  headerContent: () => JSX.Element,
  list: () => JSX.Element
};

function FindDialogBody({ isValidated, errorText, formInputs, headerContent, list }: Props): JSX.Element {
  const [forceFetchRequest, setForceFetchRequest] = useState(0);
  const [isLiveUpdateEnabled, setLiveUpdateEnabled] = useState(false);
  const enableLiveUpdate = useCallback(() => setLiveUpdateEnabled(true), []);

  const showError = !isValidated && isLiveUpdateEnabled;
  const context: FindDialogContextType = { enableLiveUpdate, forceFetchRequest, isLiveUpdateEnabled, isValidated };

  return (
    <FindDialogContext.Provider value={context}>
      <ErrorLabel show={showError} text={errorText} />
      <div className="row form-input">
        {formInputs(showError)}
        <LiveUpdateInput value={forceFetchRequest}>
          <ButtonInput onClick={() => setForceFetchRequest(forceFetchRequest + 1)}>Cerca</ButtonInput>
        </LiveUpdateInput>
      </div>
      <hr className="search-field-border" />
      <div className="list-container">
        <HeaderRow>
          {headerContent()}
        </HeaderRow>
        {list()}
      </div>
    </FindDialogContext.Provider>
  );
}

export default hot(module)(FindDialogBody);
