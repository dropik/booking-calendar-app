import * as Mocks from "./mocks";
import * as HotelSlice from "./redux/hotelSlice";
import * as TilesSlice from "./redux/tilesSlice";
import * as RoomTypesSlice from "./redux/roomTypesSlice";

export function fetchHotelDataAsync(): Promise<{ data: HotelSlice.HotelData }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: Mocks.hotel }), 500);
  });
}

export function fetchRoomTypesAsync(): Promise<{ data: RoomTypesSlice.RoomTypeData }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: Mocks.roomTypes }), 500);
  });
}

let fethcedTilesCounter: number;
export function fetchTilesAsync(from: string, to: string): Promise<{ data: TilesSlice.TileData[] }> {
  console.log(`fetching tiles from ${from} to ${to}...`);

  if (fethcedTilesCounter === undefined) {
    fethcedTilesCounter = 0;
  }

  return new Promise((resolve) => {
    const currentCounter = fethcedTilesCounter;
    fethcedTilesCounter++;
    setTimeout(() => {
      if (currentCounter < Mocks.tiles.length) {
        resolve({ data: [Mocks.tiles[currentCounter]] });
      } else {
        resolve({ data: [] });
      }
    }, 500);
  });
}
