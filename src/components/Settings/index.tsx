import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import M3Page from "../m3/M3Page";
import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";
import UserTab from "./UserTab";
import StructureTab from "./StructureTab";
import APIKeysTab from "./APIKeysTab";
import TabPanel from "./TabPanel";

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
