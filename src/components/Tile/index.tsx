import React from "react";

import { useTheme } from "@mui/material/styles";

import { TileData } from "../../redux/tilesSlice";
import { TileContext } from "./context";

import Title from "./Title";
import Body from "./Body";
import Size from "./Size";
import Alert from "./Alert";
import Container from "./Container";
import Draggable from "./Draggable";
import ContextTrigger from "./ContextTrigger";
import Expandable from "./Expandable";
import DescriptionContainer from "./DescriptionContainer";
import NotificationsContainer from "./NotificationsContainer";
import Board from "./Board";
import DepositAlert from "./DepositAlert";

type Props = {
  data: TileData
}

export default function Tile({ data }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false }}>
      <Size>
        <Expandable>
          <ContextTrigger>
            <Draggable>
              <Alert>
                <Container>
                  <DescriptionContainer>
                    <Title />
                    <Body />
                  </DescriptionContainer>
                  <NotificationsContainer>
                    <DepositAlert fontSize={theme.typography.labelLarge.fontSize?.toString()} />
                    <Board />
                  </NotificationsContainer>
                </Container>
              </Alert>
            </Draggable>
          </ContextTrigger>
        </Expandable>
      </Size>
    </TileContext.Provider>
  );
}
