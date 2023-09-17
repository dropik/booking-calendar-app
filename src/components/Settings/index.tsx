import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { api } from "../../api";
import { useFloors } from "../../redux/hooks";

import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";
import Floor from "./Floor";
import M3Page from "../m3/M3Page";
import DrawerAdjacent from "../m3/DrawerAdjacent";

export default function Settings(): JSX.Element {
  const floors = useFloors();
  const isUserDataLoaded = api.endpoints.getCurrentUser.useQueryState(null).isSuccess;
  const floorIds = Object.keys(floors).map(Number);

  return (
    <DrawerAdjacent>
      <M3Page>
        <Stack spacing={2} sx={{ pr: "1rem", pb: "1rem" }}>
          <Typography variant="displayLarge" sx={{ pt: "4rem", pl: "1rem" }}>Piani</Typography>
          <Stack spacing={3}>
            {isUserDataLoaded ?
              floorIds.map((floorId) => <Floor key={floorId} id={floorId} floor={floors[floorId]} />) :
              <Skeleton />}
          </Stack>
        </Stack>
        <CreateFloorDialog />
      </M3Page>
    </DrawerAdjacent>
  );
}
