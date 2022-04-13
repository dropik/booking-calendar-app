import React from "react";
import { hot } from "react-hot-loader";

type Props<T> = {
  children: (data: T) => JSX.Element,
  data: T | undefined
};

function LoadingDataWrapper<T>({ data, children }: Props<T>): JSX.Element {
  if (!data) {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  }

  return <>{children(data)}</>;
}

export default hot(module)(LoadingDataWrapper);
