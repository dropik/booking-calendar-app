import React, { useContext, useState } from "react";

import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";
import * as Utils from "../../utils";
import { DialogContainerContext } from "./DialogContainer";

import ErrorLabel from "./ErrorLabel";
import DateInput from "./DateInput";
import ButtonInput from "./ButtonInput";
import DescriptionRow from "./DescriptionRow";
import LoadingDataWrapper from "./LoadingDataWrapper";

type DialogState = "fill" | "loading";

export default function TaxDialogBody(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [dialogState, setDialogState] = useState<DialogState>("fill");
  const [cityTaxData, setCityTaxData] = useState<Api.CityTaxData>();
  const [fromDate, setFromDate] = useState(currentDate);
  const dateObj = new Date(currentDate);
  dateObj.setDate(dateObj.getDate() + 1);
  const [toDate, setToDate] = useState(Utils.dateToString(dateObj));
  const context = useContext(DialogContainerContext);

  const isValidated = Utils.daysBetweenDates(fromDate, toDate) > 0;

  function calculate(): void {
    async function fetchDataAsync(): Promise<void> {
      try {
        const response = await Api.fetchCityTaxAsync(fromDate, toDate);
        setCityTaxData(response.data);
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
        setDialogState("fill");
      }
    }

    if (isValidated) {
      fetchDataAsync();
      setDialogState("loading");
    }
  }

  switch (dialogState) {
  case "fill":
    return (
      <>
        <ErrorLabel show={!isValidated} text="Intervallo selezionato non corretto" />
        <div className="row">
          <DateInput label="Dal" value={fromDate} onChange={setFromDate} maxValue={toDate} />
          <DateInput label="Al" value={toDate} onChange={setToDate} minValue={fromDate} />
          <ButtonInput onClick={calculate}>Calcola</ButtonInput>
        </div>
      </>
    );

  case "loading":
    return (
      <LoadingDataWrapper data={cityTaxData}>
        {(data) => (
          <div className="dialog-table">
            <DescriptionRow name="Standard" value={data.standard.toString()} />
            <DescriptionRow name="Ragazzi sotto 14 anni" value={data.children.toString()} />
            <DescriptionRow name="Permanenze oltre 10 giorni" value={data.over10Days.toString()} />
            <div className="row centered">
              <ButtonInput onClick={context.fadeOutDialog}>OK</ButtonInput>
            </div>
          </div>
        )}
      </LoadingDataWrapper>
    );
  }
}
