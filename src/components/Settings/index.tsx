import React, { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { api } from "../../api";
import { useAppDispatch, useAppSelector, useFloors } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";

import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";
import Floor from "./Floor";
import M3Page from "../m3/M3Page";
import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";
import M3FilledButton from "../m3/M3FilledButton";
import M3Divider from "../m3/M3Divider";

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
    <Stack spacing={4}>
      <PersonalDataSection />
      <M3Divider />
      <ChangePasswordSection />
    </Stack>
  );
}

function PersonalDataSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const originalVisibleName = useAppSelector(state => state.user.visibleName);
  const [visibleName, setVisibleName] = useState<string>(originalVisibleName ?? "");
  const [updateVisibleName, updateVisibleNameResult] = api.endpoints.updateVisibleName.useMutation();

  function updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setVisibleName(event.target?.value ?? "");
  }

  function save(): void {
    updateVisibleName({ visibleName: visibleName === "" ? null : visibleName });
  }

  useEffect(() => {
    if (updateVisibleNameResult.isSuccess) {
      dispatch(showSnackbarMessage({ type: "success", message: "Salvato correttamente!" }));
      updateVisibleNameResult.reset();
    }
  }, [dispatch, updateVisibleNameResult]);

  return (
    <Stack spacing={2}>
      <Typography variant="headlineLarge">Dati personali</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          id="visibleName"
          label="Nome visualizzato"
          autoComplete="visible-name"
          value={visibleName}
          onChange={updateField}
          sx={{
            minWidth: "20rem",
          }}
        />
        {updateVisibleNameResult.isLoading
          ? <CircularProgress />
          : <M3FilledButton onClick={save}>Salva</M3FilledButton>}
      </Stack>
    </Stack>
  );
}

function ChangePasswordSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string >("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [touched, setTouched] = useState<{ oldPassword: boolean, newPassword: boolean, confirmNewPassword: boolean }>({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [updatePassword, updatePasswordResult] = api.endpoints.updatePassword.useMutation();

  const updateField = {
    oldPassword: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setOldPassword(event.target.value);
    },
    newPassword: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewPassword(event.target.value);
    },
    confirmNewPassword: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setConfirmNewPassword(event.target.value);
    },
  };

  const error = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const isValid = Object.keys(error).every(key => error[key as keyof typeof error] === "");

  if (newPassword === "") {
    error.newPassword = "Password non può essere vuota";
  }
  if (confirmNewPassword !== newPassword && confirmNewPassword !== "") {
    error.newPassword = "Le password non coincidono";
    error.confirmNewPassword = "Le password non coincidono";
  }

  const showError = {
    oldPassword: touched.oldPassword && (error.oldPassword !== ""),
    newPassword: touched.newPassword && (error.newPassword !== ""),
    confirmNewPassword: touched.confirmNewPassword && (error.confirmNewPassword !== ""),
  };

  function touchField(name: keyof typeof touched, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setTouched(prevTouched => {
      const newTouched = {...prevTouched};
      newTouched[name] = true;
      return newTouched;
    });
    updateField[name](event);
  }

  function touchForm(): void {
    setTouched(prevTouched => {
      const newTouched = {...prevTouched};
      Object.keys(newTouched).forEach(key => {
        newTouched[key as keyof typeof newTouched] = true;
      });
      return newTouched;
    });
  }

  function clearForm(): void {
    setTouched(prevTouched => {
      const newTouched = {...prevTouched};
      Object.keys(newTouched).forEach(key => {
        newTouched[key as keyof typeof newTouched] = false;
      });
      return newTouched;
    });
    setNewPassword("");
    setConfirmNewPassword("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    touchForm();
    if (isValid) {
      updatePassword({ oldPassword, newPassword });
    }
  }

  useEffect(() => {
    if (updatePasswordResult.isSuccess) {
      dispatch(showSnackbarMessage({ type: "success", message: "La password è stata aggiornata!" }));
      clearForm();
      updatePasswordResult.reset();
    }
  }, [dispatch, updatePasswordResult]);

  return (
    <Stack spacing={2} component="form" onSubmit={submit}>
      <Typography variant="headlineLarge">Password</Typography>
      <Typography variant="bodyLarge">Qua puoi modificare la password del tuo utente</Typography>
      <TextField id="username" autoComplete="username" type="text" sx={{ display: "none" }} />
      <TextField
        id="oldPassword"
        label="Vecchia password"
        autoComplete="current-password"
        value={oldPassword}
        type="password"
        onChange={(event) => touchField("oldPassword", event)}
        sx={{
          maxWidth: "20rem",
        }}
      />
      <TextField
        id="newPassword"
        label="Nuova password"
        autoComplete="new-password"
        value={newPassword}
        error={showError.newPassword}
        helperText={showError.newPassword ? error.newPassword : undefined}
        type="password"
        onChange={(event) => touchField("newPassword", event)}
        sx={{
          maxWidth: "20rem",
        }}
      />
      <TextField
        id="confirmNewPassword"
        label="Conferma nuova password"
        autoComplete="new-password"
        value={confirmNewPassword}
        error={showError.confirmNewPassword}
        helperText={showError.confirmNewPassword ? error.confirmNewPassword : undefined}
        type="password"
        onChange={(event) => touchField("confirmNewPassword", event)}
        sx={{
          maxWidth: "20rem",
        }}
      />
      <Stack direction="row">
        <M3FilledButton type="submit">Aggiorna password</M3FilledButton>
      </Stack>
    </Stack>
  );
}

function StructureTab(): JSX.Element {
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
        p: "1rem",
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
