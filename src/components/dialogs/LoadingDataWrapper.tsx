import React from "react";

type Props<T> = {
  children: (data: T) => JSX.Element,
  data: T | undefined
};

export default function LoadingDataWrapper<T>({ data, children }: Props<T>): JSX.Element {
  if (!data) {
    return (
      <div className="row">
        <div className="message">Carico...</div>
      </div>
    );
  }

  return <>{children(data)}</>;
}
