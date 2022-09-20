import React, { useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";

import { useAppSelector, useLeftmostDate } from "../../redux/hooks";
import { getCanvasFontSize, getTextWidth } from "./utils";
import { TableContext } from "../Table/TextWidthCanvas";
import { TileContext } from "./context";

export default function Body(): JSX.Element {
  const data = useContext(TileContext).data;
  const canvasRef = useContext(TableContext).canvasRef;
  const significantEntity = data.entity.replace("Camera ", "").replace("camera ", "");
  const leftmostDate = useLeftmostDate();
  const adjustLayoutRequestId = useAppSelector((state) => state.layout.adjustLayoutRequestId);
  const bodyRef = useRef<HTMLSpanElement>(null);
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
  }, [canvasRef, adjustLayoutRequestId, leftmostDate, significantEntity]);

  return (
    <Typography ref={bodyRef} variant="bodySmall">{body}</Typography>
  );
}
