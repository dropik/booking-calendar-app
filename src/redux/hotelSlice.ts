import { createSlice } from "@reduxjs/toolkit";
import mocks from "../mocks";

export type RoomData = {
  number: number,
  type: string
};

export type FloorData = {
  name: string,
  rooms: RoomData[]
};

export type HotelData = {
  floors: FloorData[]
};

export type HotelState = {
  data: HotelData
};

const initialState: HotelState = {
  data: mocks.hotel
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState: initialState,
  reducers: { }
});

export default hotelSlice.reducer;
