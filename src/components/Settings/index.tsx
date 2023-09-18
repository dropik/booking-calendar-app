import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { api } from "../../api";
import { useFloors } from "../../redux/hooks";

import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";
import Floor from "./Floor";
import M3Page from "../m3/M3Page";
import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";

export default function Settings(): JSX.Element {
  const [tab, setTab] = useState(0);

  function handleTabChange(event: React.SyntheticEvent, newValue: number): void {
    setTab(newValue);
  }

  return (
    <M3DrawerAdjacent>
      <M3Page>
        <Typography variant="displayLarge" sx={{ pl: "0.5rem", pb: "1rem" }}>Impostazioni</Typography>
        <Tabs variant="fullWidth" value={tab} onChange={handleTabChange}>
          <Tab label="Utente" id="tabpanel-user" />
          <Tab label="Struttura" id="tabpanel-structure" />
          <Tab label="Chiavi API" id="tabpanel-apiKeys" />
        </Tabs>
        <Box sx={{ position: "relative", flex: "1", overflow: "hidden", mt: "0 !important", }}>
          <TabPanel index={0} tab={tab} id="tab-user">
            <UserTab />
          </TabPanel>
          <TabPanel index={1} tab={tab} id="tab-structure">
            <StructureTab />
          </TabPanel>
          <TabPanel index={2} tab={tab} id="tab-apiKeys">
            <APIKeysTab />
          </TabPanel>
        </Box>
      </M3Page>
    </M3DrawerAdjacent>
  );
}

function UserTab(): JSX.Element {
  return (
    <>Utente</>
  );
}

function StructureTab(): JSX.Element {
  const floors = useFloors();
  const isUserDataLoaded = api.endpoints.getCurrentUser.useQueryState(null).isSuccess;
  const floorIds = Object.keys(floors).map(Number);

  return (
    <>
      <Stack spacing={2} sx={{ pr: "1rem", pb: "1rem" }}>
        <Typography variant="displayLarge" sx={{ pt: "4rem", pl: "1rem" }}>Piani</Typography>
        <Stack spacing={3}>
          {isUserDataLoaded ?
            floorIds.map((floorId) => <Floor key={floorId} id={floorId} floor={floors[floorId]} />) :
            <Skeleton />}
        </Stack>
      </Stack>
      <CreateFloorDialog />
    </>
  );
}

function APIKeysTab(): JSX.Element {
  return (
    <>Chiavi API</>
  );
}

type TabPanelProps = {
  children?: React.ReactNode,
  index: number,
  tab: number,
  id: string,
};

function TabPanel({ children, index, tab, id }: TabPanelProps): JSX.Element {
  const theme = useTheme();
  const show = tab === index;

  return (
    <Box
      role="tabpanel"
      id={id}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        opacity: show ? 1 : 0,
        transition: show ? theme.transitions.create(["transform", "opacity"], {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.emphasizedDecelerate,
        }) : undefined,
        transform: show ? "none" : (
          tab < index ? "translateX(200px)" : "translateX(-200px)"
        ),
        zIndex: show ? 1 : 0,
      }}
    >
      {show ? children : null}
    </Box>
  );
}
