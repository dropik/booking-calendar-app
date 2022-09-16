import React from "react";

import FetchData from "./FetchData";
import Sections from "./Sections";
import TextWidthCanvas from "./TextWidthCanvas";

export default function Table(): JSX.Element {
  return (
    <>
      <FetchData />
      <TextWidthCanvas>
        <Sections />
      </TextWidthCanvas>
    </>
  );
}
