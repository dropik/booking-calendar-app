import React, { useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";

import { useAppSelector, useLeftmostDate } from "../../redux/hooks";
import { TableContext } from "../Table/TextWidthCanvas";
import { TileContext } from "./context";
import { TileData } from "../../redux/tilesSlice";
import { Utils } from "../../utils";

export default function Title(): JSX.Element | null {
  const { data } = useContext(TileContext);

  if (!data) {
    return null;
  }

  return <TitleWrappee data={data} />;
}

type TitleWrappeeProps = {
  data: TileData
};

function TitleWrappee({ data }: TitleWrappeeProps): JSX.Element {
  const canvasRef = useContext(TableContext).canvasRef;
  const leftmostDate = useLeftmostDate();
  const adjustLayoutRequestId = useAppSelector((state) => state.layout.adjustLayoutRequestId);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [title, setTitle] = useState(`${data.name} - ${data.persons} person${data.persons > 1 ? "e" : "a"}`);

  useEffect(() => {
    if (titleRef.current && canvasRef.current) {
      const titleFontSize = Utils.getCanvasFontSize(titleRef.current);

      let text = `${data.name} - ${data.persons} person${data.persons > 1 ? "e" : "a"}`;
      let width = Utils.getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      const nameParts = data.name.split(" ");

      if (nameParts.length > 2) {
        let allCapitalized = true;
        let noneCapitalized = true;

        for (const namePart of nameParts) {
          const firstCharCode = namePart.charCodeAt(0);
          if ((firstCharCode >= 65) && (firstCharCode <= 90)) {
            noneCapitalized = false;
          } else {
            allCapitalized = false;
          }
        }

        if (allCapitalized || noneCapitalized) {
          nameParts.splice(2);
          let name = "";
          for (const namePart in nameParts) {
            name += `${namePart} `;
          }
          name.trimEnd();
          text = `${name} - ${data.persons} person${data.persons > 1 ? "e" : "a"}`;
          width = Utils.getTextWidth(canvasRef.current, text, titleFontSize);

          if (width <= titleRef.current.clientWidth) {
            setTitle(text);
            return;
          }
        }
      }

      let name = "";
      for (const namePart of nameParts) {
        name += `${namePart} `;
      }
      name.trimEnd();
      text = `${name} - ${data.persons}`;
      width = Utils.getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      let shortenedName = `${nameParts[0][0]}.`;
      for (let i = 1; i < nameParts.length; i++) {
        shortenedName += `${nameParts[i]} `;
      }
      shortenedName.trimEnd();
      text = `${shortenedName} - ${data.persons}`;
      width = Utils.getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      let initials = `${nameParts[0][0]}.`;
      const nameFirstCharCode = nameParts[0].charCodeAt(0);
      if ((nameFirstCharCode < 65) || (nameFirstCharCode > 90)) {
        initials += `${nameParts[1][0]}.`;
      } else {
        for (let i = 1; i < nameParts.length; i++) {
          const firstCharCode = nameParts[i].charCodeAt(0);
          if ((firstCharCode >= 65) && (firstCharCode <= 90)) {
            initials += `${nameParts[i][0]}.`;
          }
        }
      }
      text = `${initials} - ${data.persons}`;
      width = Utils.getTextWidth(canvasRef.current, text, titleFontSize);
      if (width <= titleRef.current.clientWidth) {
        setTitle(text);
        return;
      }

      setTitle(`${data.persons}`);
    }
  }, [canvasRef, adjustLayoutRequestId, leftmostDate, data.name, data.persons]);

  return (
    <Typography ref={titleRef} variant="titleMedium">{Utils.evaluateEntitiesInString(title)}</Typography>
  );
}
