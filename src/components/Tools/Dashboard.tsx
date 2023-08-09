/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";

import { NavLink } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import { useAppDispatch, useAppSelector, useLeftmostDate } from "../../redux/hooks";
import { show as showMessage } from "../../redux/snackbarMessageSlice";
import { CityTaxData, fetchCityTaxAsync, fetchPoliceRicevutaAsync, postPoliceExportRequestAsync } from "../../api";
import { Utils } from "../../utils";

import M3DatePicker from "../m3/M3DatePicker";
import M3TextButton from "../m3/M3TextButton";
import { SurfaceTint } from "../m3/Tints";
import M3Skeleton from "../m3/M3Skeleton";
import M3Chip from "../m3/M3Chip";

export default function Dashboard(): JSX.Element {
  const dispatch = useAppDispatch();
  const leftmostDate = useLeftmostDate();
  const [downloadDate, setDownloadDate] = useState(leftmostDate);
  const [from, setFrom] = useState(leftmostDate);
  const [to, setTo] = useState(Utils.getDateShift(leftmostDate, 1));
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);
  const theme = useTheme();
  const drawerOpened = useAppSelector((state) => state.drawer.open);
  const [cityTaxData, setCityTaxData] = useState<CityTaxData | undefined>(undefined);
  const [isCityTaxLoading, setIsCityTaxLoading] = useState(false);
  const [isDownloadDataLoading, setIsDownloadDataLoading] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const isValid = isFromValid && isToValid;
  const openDetails = cityTaxData !== undefined;

  function calculateCityTax(): void {
    async function fetchDataAsync(): Promise<void> {
      try {
        const response = await fetchCityTaxAsync(from, to);
        setCityTaxData(response.data);
      } catch (error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
      } finally {
        setIsCityTaxLoading(false);
      }
    }

    if (isValid) {
      setIsCityTaxLoading(true);
      fetchDataAsync();
    }
  }

  function requestExport(onPostAsync: (date: string) => Promise<void>): void {
    async function postDataAsync() {
      try {
        await onPostAsync(downloadDate);
        dispatch(showMessage({ type: "success", message: "I dati sono stati mandati correttamente!" }));
      } catch (error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
      } finally {
        setIsDownloadDataLoading(false);
      }
    }

    setIsDownloadDataLoading(true);
    postDataAsync();
  }

  function downloadRicevuta(): void {
    async function fetchDataAsync() {
      try {
        const response = await fetchPoliceRicevutaAsync(downloadDate);
        const data = response.data;
        if (anchorRef.current) {
          if (data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download = `polizia-ricevuta-${downloadDate}.pdf`;
            anchorRef.current.click();
          } else {
            dispatch(showMessage({ type: "info", message: "Niente data da scaricare!" }));
          }
        }
      } catch (error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
      } finally {
        setIsDownloadDataLoading(false);
      }
    }

    setIsDownloadDataLoading(true);
    fetchDataAsync();
  }

  return (
    <Stack spacing={1} sx={{ pr: "1rem" }}>
      <Typography variant="displaySmall" sx={{ pt: "3rem", pl: "1rem" }}>Strumenti</Typography>
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
            {isDownloadDataLoading ? <CircularProgress color="primary" /> : (
              <>
                <M3TextButton onClick={downloadRicevuta}>Scarica ricevuta</M3TextButton>
                <M3TextButton onClick={() => requestExport(postPoliceExportRequestAsync)}>Polizia</M3TextButton>
              </>
            )}
          </Stack>
          <SurfaceTint sx={{
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
              {isCityTaxLoading ?
                <CircularProgress color="primary" /> :
                <M3TextButton onClick={calculateCityTax}>Calcola</M3TextButton>
              }
            </Stack>
            <SurfaceTint sx={{
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
                  <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>{!isCityTaxLoading ? `${cityTaxData?.standard ?? 0} presenze` : <M3Skeleton width="4rem" />}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                  <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>{"Bambini <14"}</Typography>
                  <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>{!isCityTaxLoading ? `${cityTaxData?.children ?? 0} presenze` : <M3Skeleton width="4rem" />}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                  <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>{"Permanenze >10 giorni"}</Typography>
                  <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>{!isCityTaxLoading ? `${cityTaxData?.over10Days ?? 0} presenze` : <M3Skeleton width="4rem" />}</Typography>
                </Stack>
              </Stack>
            </Collapse>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
