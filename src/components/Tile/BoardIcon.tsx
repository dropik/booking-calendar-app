import React from "react";
import FreeBreakfastOutlined from "@mui/icons-material/FreeBreakfastOutlined";
import RestaurantOutlined from "@mui/icons-material/RestaurantOutlined";
import BedOutlined from "@mui/icons-material/BedOutlined";

type BoardIconProps = {
  baseBoard: string,
  fontSize?: string,
};

export default function BoardIcon({ baseBoard, fontSize }: BoardIconProps): JSX.Element {
  if (baseBoard == "BB") {
    return <FreeBreakfastOutlined sx={{ fontSize }} />;
  }
  if (baseBoard == "HB") {
    return <RestaurantOutlined sx={{ fontSize }} />;
  }
  return <BedOutlined sx={{ fontSize }} />;
}
