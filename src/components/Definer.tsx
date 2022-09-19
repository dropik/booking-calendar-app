import React from "react";

type DefinerProps<T> = {
  value?: T,
  children: (value: T) => React.ReactNode
};

export default function Definer<T>({ value, children }: DefinerProps<T>): JSX.Element | null {
  if (!value) {
    return null;
  }

  return <>{children(value)}</>;
}
