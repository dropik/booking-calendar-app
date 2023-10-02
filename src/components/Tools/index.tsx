import React, { useEffect, useRef, useState } from "react";

import { NavLink } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import { TokenResponse, api } from "../../api";
import { useAppDispatch, useAppSelector, useLeftmostDate } from "../../redux/hooks";
import { show as showMessage } from "../../redux/snackbarMessageSlice";
import { Utils } from "../../utils";

import M3DatePicker from "../m3/M3DatePicker";
import M3TextButton from "../m3/M3TextButton";
import { M3SurfaceTint } from "../m3/M3Tints";
import M3Skeleton from "../m3/M3Skeleton";
import M3Chip from "../m3/M3Chip";
import { setTokens } from "../../redux/authSlice";
import TopAppBar from "../TopAppBar";
import UpperHeader from "../TopAppBar/UpperHeader";
import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";

export default function Tools(): JSX.Element {
  const dispatch = useAppDispatch();
  const leftmostDate = useLeftmostDate();
  const [downloadDate, setDownloadDate] = useState(leftmostDate);
  const [from, setFrom] = useState(leftmostDate);
  const [to, setTo] = useState(Utils.getDateShift(leftmostDate, 1));
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);
  const isCityTaxValid = isFromValid && isToValid;
  const theme = useTheme();
  const drawerOpened = useAppSelector((state) => state.drawer.open);
  const [postPoliceRicevuta, postPoliceRicevutaResult] = api.endpoints.postPoliceRicevuta.useMutation();
  const getPoliceRicevuta = useGetPoliceRicevuta();
  const [getCityTaxTrigger, cityTaxResult] = api.endpoints.getCityTax.useLazyQuery();
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const openDetails = cityTaxResult.isSuccess;
  const isPoliceLoading = postPoliceRicevutaResult.isLoading || getPoliceRicevuta.isLoading;

  useEffect(() => {
    if (postPoliceRicevutaResult.isSuccess) {
      dispatch(showMessage({ type: "success", message: "I dati sono stati mandati correttamente!" }));
      postPoliceRicevutaResult.reset();
    }
  }, [dispatch, postPoliceRicevutaResult]);

  useEffect(() => {
    if (getPoliceRicevuta.isSuccess && getPoliceRicevuta.data) {
      const data = getPoliceRicevuta.data;
      if (anchorRef.current) {
        if (data.size > 0) {
          anchorRef.current.href = URL.createObjectURL(data);
          anchorRef.current.download = `polizia-ricevuta-${downloadDate}.pdf`;
          anchorRef.current.click();
        } else {
          dispatch(showMessage({ type: "info", message: "Niente data da scaricare!" }));
        }
      }
      getPoliceRicevuta.reset();
    }
  }, [dispatch, downloadDate, getPoliceRicevuta]);

  return (
    <>
      <TopAppBar>
        <UpperHeader />
      </TopAppBar>
      <M3DrawerAdjacent>
        <Stack spacing={1} sx={{ pr: "1rem" }}>
          <Typography variant="displaySmall" sx={{ pl: "1rem" }}>Strumenti</Typography>
          <Stack direction="row" spacing={1}>
            <NavLink to="istat">
              <M3Chip selected={false} onClick={() => void 0} label="ISTAT" />
            </NavLink>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: "2rem !important" }}>
            <Stack spacing={2} sx={{
              position: "relative",
              justifyContent: "space-between",
              p: "1rem",
              borderRadius: "0.75rem",
              flexShrink: 1,
              color: theme.palette.onSurfaceVariant.light
            }}>
              <Stack spacing={2}>
                <Typography variant="headlineMedium">Esporta dati</Typography>
                <M3DatePicker
                  value={new Date(downloadDate)}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setDownloadDate(Utils.dateToString(date));
                    }
                  }}
                  renderInput={(props) => <TextField {...props} />}
                />
              </Stack>
              <a ref={anchorRef}></a>
              <Stack spacing={1} direction="row" justifyContent="flex-end">
                {isPoliceLoading ? <CircularProgress color="primary" /> : (
                  <>
                    <M3TextButton onClick={() => getPoliceRicevuta.query(downloadDate)}>Scarica ricevuta</M3TextButton>
                    <M3TextButton onClick={() => postPoliceRicevuta({ date: downloadDate })}>Polizia</M3TextButton>
                  </>
                )}
              </Stack>
              <M3SurfaceTint sx={{
                backgroundColor: theme.palette.primary.light,
                opacity: theme.opacities.surface2,
                m: "0 !important"
              }} />
            </Stack>
            <Stack direction="row" sx={{
              border: `1px solid ${theme.palette.outline.light}`,
              borderRadius: "0.75rem"
            }}>
              <Stack spacing={2} sx={{
                position: "relative",
                justifyContent: "space-between",
                p: "1rem",
                borderRadius: "0.75rem",
                color: theme.palette.onSurfaceVariant.light,
              }}>
                <Stack spacing={2}>
                  <Typography variant="headlineMedium">Tassa di soggiorno</Typography>
                  <Stack direction={drawerOpened ? "column" : "row"} spacing={1}>
                    <M3DatePicker
                      value={new Date(from)}
                      onChange={(date: Date | null) => {
                        if (date) {
                          setIsFromValid(false);
                          setFrom(Utils.dateToString(date));
                        }
                      }}
                      onAccept={() => setIsFromValid(true)}
                      onError={(reason) => setIsFromValid(reason === null)}
                      shouldDisableDate={(date) => Utils.daysBetweenDates(to, Utils.dateToString(date)) > 0}
                      renderInput={({ error, ...props }) => (
                        <TextField
                          {...props}
                          label="Dal"
                          error={error}
                          helperText={error ? "Periodo non valido" : undefined}
                          onBlur={() => setIsFromValid(!error)}
                        />
                      )}
                    />
                    <M3DatePicker
                      value={new Date(to)}
                      onChange={(date: Date | null) => {
                        if (date) {
                          setIsToValid(false);
                          setTo(Utils.dateToString(date));
                        }
                      }}
                      onAccept={() => setIsToValid(true)}
                      onError={(reason) => setIsToValid(reason === null)}
                      shouldDisableDate={(date) => Utils.daysBetweenDates(Utils.dateToString(date), from) > 0}
                      renderInput={({ error, ...props }) => (
                        <TextField
                          {...props}
                          label="Al"
                          error={error}
                          helperText={error ? "Periodo non valido" : undefined}
                          onBlur={() => setIsToValid(!error)}
                        />
                      )}
                    />
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                  {cityTaxResult.isFetching ?
                    <CircularProgress color="primary" /> :
                    <M3TextButton onClick={() => {
                      if (isCityTaxValid) {
                        getCityTaxTrigger({ from, to });
                      }
                    }}>Calcola</M3TextButton>
                  }
                </Stack>
                <M3SurfaceTint sx={{
                  backgroundColor: theme.palette.primary.light,
                  opacity: theme.opacities.surface2,
                  m: "0 !important"
                }}
                />
              </Stack>
              <Box>
                <Collapse in={openDetails} orientation="horizontal">
                  <Stack spacing={2} sx={{ p: "1rem" }}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                      <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>Regolari</Typography>
                      <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>{!cityTaxResult.isFetching ? `${cityTaxResult.data?.standard ?? 0} presenze` : <M3Skeleton width="4rem" />}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                      <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>{"Bambini <14"}</Typography>
                      <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>{!cityTaxResult.isFetching ? `${cityTaxResult.data?.children ?? 0} presenze` : <M3Skeleton width="4rem" />}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                      <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>{"Permanenze >10 giorni"}</Typography>
                      <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>{!cityTaxResult.isFetching ? `${cityTaxResult.data?.over10Days ?? 0} presenze` : <M3Skeleton width="4rem" />}</Typography>
                    </Stack>
                  </Stack>
                </Collapse>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </M3DrawerAdjacent>
    </>
  );
}

function useGetPoliceRicevuta(): { query: (date: string) => void, data: Blob | undefined, isLoading: boolean, isSuccess: boolean, reset: () => void } {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<Blob | undefined>(undefined);

  function reset(): void {
    setData(undefined);
    setIsLoading(false);
    setIsSuccess(false);
  }

  return {
    query: (date: string) => {
      async function fetchData() {
        let workingAuth = auth;
        try {
          let response = await fetch(`${process.env.API_URL}/police/ricevuta?date=${date}`, {
            headers: {
              "Authorization": `Bearer ${workingAuth.accessToken}`,
            },
          });
          if (!response.ok) {
            if (response.status === 408) {
              throw new Error("Errore di connessione!");
            } else if (response.status === 401) {
              try {
                const refreshResponse = await fetch(`${process.env.API_URL}/auth/refresh`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(auth),
                });
                if (!refreshResponse.ok) {
                  window.location.href = "/login";
                } else {
                  const newAuth = (await refreshResponse.json()) as TokenResponse;
                  dispatch(setTokens(newAuth));
                  workingAuth = newAuth;
                }
              } catch (exception) {
                window.location.href = "/login";
              }
              response = await fetch(`${process.env.API_URL}/police/ricevuta?date=${date}`, {
                headers: {
                  "Authorization": `Bearer ${workingAuth.accessToken}`,
                },
              });
            } else {
              throw new Error("Errore durante caricamento della ricevuta");
            }
          }

          // repeating if because we have to consider that after refetch the response may become ok
          if (!response.ok) {
            throw new Error("Errore durante caricamento della ricevuta");
          }

          try {
            const data = await response.blob();
            setData(data);
            setIsLoading(false);
            setIsSuccess(true);
          } catch (exception) {
            throw new Error("Formato della risposta sbagliata");
          }
        } catch (exception) {
          if (exception && typeof(exception) === "object" && "message" in exception) {
            dispatch(showMessage({ type: "error", message: exception.message as string }));
          } else {
            dispatch(showMessage({ type: "error", message: "Server error" }));
          }
          setIsLoading(false);
        }
      }

      fetchData();
      setIsLoading(true);
      setIsSuccess(false);
    },
    data: data,
    isLoading: isLoading,
    isSuccess: isSuccess,
    reset: reset,
  };
}
