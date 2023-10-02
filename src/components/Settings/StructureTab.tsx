import React from "react";

import Stack from "@mui/material/Stack";

import { api } from "../../api";
import { useFloors } from "../../redux/hooks";

import Floor from "./Floor";
import Skeleton from "./Skeleton";
import CreateFloorDialog from "./CreateFloorDialog";

export default function StructureTab(): JSX.Element {
  const floors = useFloors();
  const isUserDataLoaded = api.endpoints.getCurrentUser.useQueryState(null).isSuccess;
  const floorIds = Object.keys(floors).map(Number);

  return (
    <>
      <Stack spacing={3} sx={{ maxWidth: "60rem" }}>
        {isUserDataLoaded ?
          floorIds.map((floorId) => <Floor key={floorId} id={floorId} floor={floors[floorId]} />) :
          <Skeleton />}
      </Stack>
      <CreateFloorDialog />
    </>
  );
}
