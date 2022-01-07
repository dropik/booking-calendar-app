import * as Mocks from "./mocks";
import * as HotelSlice from "./redux/hotelSlice";
import * as OccupationsSlice from "./redux/occupationsSlice";

export function fetchHotelDataAsync(): Promise<{ data: HotelSlice.HotelData }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: Mocks.hotel }), 500);
  });
}

let fethcedTilesCounter: number;
export function fetchTilesAsync(from: string, to: string): Promise<{ data: OccupationsSlice.TileData[] }> {
  console.log(`fetching tiles from ${from} to ${to}...`);

  if (fethcedTilesCounter === undefined) {
    fethcedTilesCounter = 0;
  }

  return new Promise((resolve) => {
    const currentCounter = fethcedTilesCounter;
    fethcedTilesCounter++;
    setTimeout(() => {
      if (currentCounter < 2) {
        resolve({ data: [Mocks.tiles[currentCounter]] });
      } else {
        resolve({ data: [] });
      }
    }, 500);
  });
}
