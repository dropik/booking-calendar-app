import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";

import { CityTaxData, fetchCityTaxAsync, fetchIstatDataAsync, fetchPoliceDataAsync } from "../../api";
import * as Utils from "../../utils";
import { useAppDispatch, useAppSelector, useCurrentDate } from "../../redux/hooks";
import { show as showError } from "../../redux/connectionErrorSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3DatePicker from "../m3/M3DatePicker";
import M3TextButton from "../m3/M3TextButton";
import { SurfaceTint } from "../m3/Tints";
import CircularProgress from "@mui/material/CircularProgress";

export default function Tools(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [downloadDate, setDownloadDate] = useState(currentDate);
  const [from, setFrom] = useState(currentDate);
  const [to, setTo] = useState(Utils.getDateShift(currentDate, 1));
  const [isFromValid, setIsFromValid] = useState(true);
  const [isToValid, setIsToValid] = useState(true);
  const theme = useTheme();
  const drawerOpened = useAppSelector((state) => state.drawer.open);
  const [cityTaxData, setCityTaxData] = useState<CityTaxData | undefined>(undefined);
  const [isCityTaxLoading, setIsCityTaxLoading] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [isDownloadDataLoading, setIsDownloadDataLoading] = useState(false);

  const isValid = isFromValid && isToValid;
  const openDetails = cityTaxData !== undefined;

  function calculateCityTax(): void {
    async function fetchDataAsync(): Promise<void> {
      try {
        const response = await fetchCityTaxAsync(from, to);
        setCityTaxData(response.data);
      } catch (error) {
        dispatch(showError());
      } finally {
        setIsCityTaxLoading(false);
      }
    }

    if (isValid) {
      setIsCityTaxLoading(true);
      fetchDataAsync();
    }
  }

  function download(
    onFetchAsync: (date: string) => Promise<{ data: Blob }>,
    setFilename: (value: string) => string
  ): void {
    async function fetchDataAsync() {
      try {
        const response = await onFetchAsync(downloadDate);
        const data = response.data;
        if (anchorRef.current) {
          if (data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download = setFilename(downloadDate);
            anchorRef.current.click();
          } else {
            //setNoData(true);
          }
        }
      } catch (error) {
        dispatch(showError());
      } finally {
        setIsDownloadDataLoading(false);
      }
    }

    setIsDownloadDataLoading(true);
    fetchDataAsync();
  }

  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem" }}>
        <Typography variant="displaySmall" sx={{ pt: "4rem" }}>Strumenti</Typography>
        <Stack direction="row" spacing={2}>
          <Stack spacing={2} sx={{
            position: "relative",
            justifyContent: "space-between",
            p: "1rem",
            borderRadius: "0.75rem",
            flexShrink: 1,
            color: theme.palette.onSurfaceVariant.light
          }}>
            <a ref={anchorRef}></a>
            <Stack spacing={2}>
              <Typography variant="headlineMedium">Scarica dati</Typography>
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
            <Stack spacing={1} direction="row" justifyContent="flex-end">
              {isDownloadDataLoading ? <CircularProgress color="primary" /> : (
                <>
                  <M3TextButton onClick={() => download(fetchPoliceDataAsync, (date) => `polizia-${date}.txt`)}>Polizia</M3TextButton>
                  <M3TextButton onClick={() => download(fetchIstatDataAsync, (date) => `istat-${date}.pdf`)}>ISTAT</M3TextButton>
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
            <Collapse in={openDetails} orientation="horizontal">
              <Stack spacing={2} sx={{ p: "1rem" }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                  <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>Regolari</Typography>
                  <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>8 presenze</Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                  <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>{"Bambini <14"}</Typography>
                  <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>2 presenze</Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ pt: "1rem", pb: "1rem" }}>
                  <Typography variant="titleMedium" sx={{ whiteSpace: "nowrap" }}>{"Permanenze >10 giorni"}</Typography>
                  <Typography variant="bodyMedium" sx={{ whiteSpace: "nowrap" }}>0 presenze</Typography>
                </Stack>
              </Stack>
            </Collapse>
          </Stack>
        </Stack>
      </Stack>
    </DrawerAdjacent>
  );
}
