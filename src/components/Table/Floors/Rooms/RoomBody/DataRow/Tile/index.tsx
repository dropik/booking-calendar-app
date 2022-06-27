import React, { createContext } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { TileColor, TileData } from "../../../../../../../redux/tilesSlice";
import Title from "./Title";
import Body from "./Body";
import TileSize from "./TileSize";
import TileAlert from "./TileAlert";

type Props = {
  data: TileData
}

type TileContextType = {
  data: TileData,
  cropLeft: boolean,
  cropRight: boolean
}

export const TileContext = createContext<TileContextType>({
  data: {
    id: "",
    bookingId: "",
    name: "",
    from: "",
    nights: 0,
    roomType: "",
    entity: "",
    persons: 0,
    color: "booking1"
  },
  cropLeft: false,
  cropRight: false
});

export default function Tile({ data }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <TileContext.Provider value={{ data: data, cropLeft: false, cropRight: false }}>
      <TileSize>
        <TileContext.Consumer>
          {(value) => (
            <TileAlert>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "3rem",
                  p: "1rem",
                  borderRadius: "0.75rem",
                  ...(value.cropLeft && {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }),
                  ...(value.cropRight && {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }),
                  backgroundColor: theme.palette[`${data.color}Container`].light,
                  color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light,
                  border: `1px solid ${theme.palette.outline.light}`,
                  ...(value.cropRight && {
                    borderRight: 0
                  }),
                  ...(value.cropLeft && {
                    borderLeft: 0
                  })
                }}
              >
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  overflow: "hidden",
                  "& > span": {
                    width: "100%",
                    whiteSpace: "nowrap"
                  }
                }}>
                  <Title />
                  <Body />
                </Box>
              </Box>
            </TileAlert>
          )}
        </TileContext.Consumer>
      </TileSize>
    </TileContext.Provider>
  );
}
