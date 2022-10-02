import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector, useFloors } from "../../redux/hooks";
import { fetchAsync as fetchFloorsAsync } from "../../redux/floorsSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";
import Floor from "./Floor";

export default function Settings(): JSX.Element {
  const dispatch = useAppDispatch();
  const floors = useFloors();
  const floorsReady = useAppSelector((state) => state.floors.status === "idle");

  const floorIds = Object.keys(floors);

  useEffect(() => {
    dispatch(fetchFloorsAsync());
  }, [dispatch]);

  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem", pb: "1rem" }}>
        <Typography variant="displayLarge" sx={{ pt: "4rem", pl: "1rem" }}>Piani</Typography>
        <Stack spacing={3}>
          {floorsReady ?
            floorIds.map((floorId) => <Floor key={floorId} id={floorId} floor={floors[floorId]} />) :
            <Skeleton />}
        </Stack>
      </Stack>
      <CreateFloorDialog />
    </DrawerAdjacent>
  );
}
