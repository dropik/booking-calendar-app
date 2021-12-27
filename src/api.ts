import mocks from "./mocks";
import * as hotel from "./redux/hotelSlice";
import * as table from "./redux/tableSlice";

export function fetchHotelDataAsync(): Promise<{ data: hotel.HotelData }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mocks.hotel }), 500);
  });
}

export function fetchTilesAsync(): Promise<{ data: table.TileData[] }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: mocks.tiles }), 500);
  });
}
