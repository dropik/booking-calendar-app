import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import * as Utils from "../../../../../../../utils";
import { TileColor, TileData } from "../../../../../../../redux/tilesSlice";
import { useAppSelector, useLeftmostDate } from "../../../../../../../redux/hooks";
import Title from "./Title";
import { getCanvasFontSize, getTextWidth } from "./utils";

type Props = {
  data: TileData
}

export default function Tile({ data }: Props): JSX.Element {
  const theme = useTheme();
  const leftmostDate = useLeftmostDate();
  const rightmostDate = useAppSelector((state) => Utils.getDateShift(state.table.leftmostDate, state.table.columns - 1));
  const arrivalToRightmost = Utils.daysBetweenDates(data.from, rightmostDate);
  const leftmostToArrival = Utils.daysBetweenDates(leftmostDate, data.from);
  const assignedRoomType = useAppSelector((state) => {
    for (const floor of state.hotel.data.floors) {
      for (const room of floor.rooms) {
        if (room.number === data.roomNumber) {
          return room.type;
        }
      }
    }
  });
  const personsInAssignedRoomType = useAppSelector((state) => assignedRoomType ? state.roomTypes.data[assignedRoomType] : undefined);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const adjustLayoutRequestId = useAppSelector((state) => state.layout.adjustLayoutRequestId);
  const significantEntity = data.entity.replace("Camera ", "").replace("camera ", "");
  const [body, setBody] = useState(significantEntity);

  useEffect(() => {
    if (bodyRef.current && canvasRef.current) {
      const bodyFontSize = getCanvasFontSize(bodyRef.current);

      const width = getTextWidth(canvasRef.current, significantEntity, bodyFontSize);
      if (width <= bodyRef.current.clientWidth) {
        setBody(significantEntity);
        return;
      }

      const entityParts = significantEntity.split(" ");
      let entityAbbreviation = "";
      if (entityParts.length > 1) {
        for (const entityPart of entityParts) {
          entityAbbreviation += entityPart[0].toLocaleUpperCase();
        }
      } else {
        const consonants = ["b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"];
        entityAbbreviation = significantEntity[0];
        for (let i = 1; i < significantEntity.length; i++) {
          if (consonants.includes(significantEntity[i])) {
            entityAbbreviation += significantEntity[i];
            break;
          }
        }
      }
      setBody(entityAbbreviation);
    }
  }, [adjustLayoutRequestId, leftmostDate, significantEntity]);

  let badgeColor = undefined;
  if (personsInAssignedRoomType) {
    if (!personsInAssignedRoomType.includes(data.persons)) {
      badgeColor = theme.palette.error.light;
    } else if (assignedRoomType !== data.roomType) {
      badgeColor = theme.palette.warning.dark;
    }
  }

  let cropLeft = false;
  let cropRight = false;

  let size = data.nights;
  if (leftmostToArrival < 0) {
    size -= -leftmostToArrival - 0.5;
    cropLeft = true;
  }
  if (arrivalToRightmost < data.nights) {
    size -= data.nights - arrivalToRightmost - 0.5;
    cropRight = true;
  }

  return (
    <Grid item xs={size} sx={{
      ...(!cropRight && {
        paddingRight: "1.5px"
      }),
      ...(!cropLeft && {
        paddingLeft: "1.5px"
      }),
      pt: "1px",
      pb: "1px"
    }}>
      <Badge
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
          ...(cropRight && {
            horizontal: "left"
          })
        }}
        badgeContent=" "
        variant="dot"
        sx={{
          display: "block",
          "& .MuiBadge-badge": {
            backgroundColor: badgeColor,
            top: "0.75rem",
            right: "0.75rem",
            ...(cropRight && {
              right: "auto",
              left: "0.75rem"
            })
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "3rem",
            p: "1rem",
            borderRadius: "0.75rem",
            ...(cropLeft && {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }),
            ...(cropRight && {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }),
            backgroundColor: theme.palette[`${data.color}Container`].light,
            color: theme.palette[`on${data.color[0].toUpperCase()}${data.color.substring(1)}Container` as `on${Capitalize<TileColor>}Container`].light,
            border: `1px solid ${theme.palette.outline.light}`,
            ...(cropRight && {
              borderRight: 0
            }),
            ...(cropLeft && {
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
            <canvas
              ref={canvasRef}
              className={css`
                position: fixed;
                top: -100000px
              `}
            />
            <Title data={data} canvasRef={canvasRef} />
            <Typography ref={bodyRef} variant="bodySmall">{body}</Typography>
          </Box>
        </Box>
      </Badge>
    </Grid>
  );
}
