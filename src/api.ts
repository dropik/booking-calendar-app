import * as Mocks from "./mocks";
import * as HotelSlice from "./redux/hotelSlice";
import * as TableSlice from "./redux/tableSlice";

export function fetchHotelDataAsync(): Promise<{ data: HotelSlice.HotelData }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: Mocks.hotel }), 500);
  });
}

export function fetchTilesAsync(from: string, to: string): Promise<{ data: TableSlice.TileData[] }> {
  console.log(`fetching tiles from ${from} to ${to}...`);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: Mocks.tiles }), 500);
  });
}
