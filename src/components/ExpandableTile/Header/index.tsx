import React, { forwardRef } from "react";
import Stack from "@mui/material/Stack";

import Container from "./Container";
import HeadlineRow from "./HeadlineRow";
import Persons from "./Persons";
import Period from "./Period";
import RoomType from "./RoomType";
import RoomNumber from "./RoomNumber";
import Board from "./Board";

const Header = forwardRef<HTMLDivElement, {}>(function Header(_, ref): JSX.Element {
  return (
    <Container ref={ref}>
      <HeadlineRow />
      <Persons />
      <Stack direction="row">
        <Stack sx={{ pt: "0.5rem", flexGrow: 1 }}>
          <Period />
          <RoomType />
          <RoomNumber />
        </Stack>
        <Board />
      </Stack>
    </Container>
  );
});

export default Header;
