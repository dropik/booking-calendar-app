import React, { useState } from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";

import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";
import * as Utils from "../../utils";

import "./TaxDialogBody.css";

type DialogState = "fill" | "loading" | "done";

type Props = {
  fadeOutDialog: () => void
};

function TaxDialogBody(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [dialogState, setDialogState] = useState<DialogState>("fill");
  const [cityTaxData, setCityTaxData] = useState<Api.CityTaxData>();
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(currentDate);

  function calculate() {
    async function fetchDataAsync() {
      try {
        const response = await Api.fetchCityTaxAsync(fromDate, toDate);
        setCityTaxData(response.data);
        setDialogState("done");
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
        setDialogState("fill");
      }
    }
    fetchDataAsync();
    setDialogState("loading");
  }

  let content: JSX.Element;
  switch (dialogState) {
  case "fill":
    content = (
      <div className="row">
        <div>
          <span className="label">Da:</span>
          <DatePicker
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date(fromDate)}
            onChange={(date: Date) => { setFromDate(Utils.dateToString(date)); }}
          />
        </div>
        <div>
          <span className="label">A:</span>
          <DatePicker
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date(toDate)}
            onChange={(date: Date) => { setToDate(Utils.dateToString(date)); }}
          />
        </div>
        <div className="button" onClick={calculate}>Calcola</div>
      </div>
    );
    break;

  case "loading":
    content = (
      <div className="row">
        <div className="message">Calcolo...</div>
      </div>
    );
    break;

  case "done":
    content = (
      <div className="dialog-table">
        <div className="row">
          <div>Standard:</div>
          <div><b>{cityTaxData?.standard}</b></div>
        </div>
        <div className="row">
          <div>Ragazzi sotto 14 anni:</div>
          <div><b>{cityTaxData?.children}</b></div>
        </div>
        <div className="row">
          <div>Permanenze oltre 10 giorni:</div>
          <div><b>{cityTaxData?.over10Days}</b></div>
        </div>
        <div className="row centered">
          <div className="button" onClick={props.fadeOutDialog}>OK</div>
        </div>
      </div>
    );
  }

  return content;
}

export default hot(module)(TaxDialogBody);
