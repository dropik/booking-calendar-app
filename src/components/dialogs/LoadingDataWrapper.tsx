import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";

type Props = {
  isLoaded: boolean,
  children: ReactNode
};

function LoadingDataWrapper(props: Props): JSX.Element {
  if (!props.isLoaded) {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  }

  return <>{props.children}</>;
}

export default hot(module)(LoadingDataWrapper);
