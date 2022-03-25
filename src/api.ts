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

let isTilesFetched = false;
export function fetchTilesAsync(from: string, to: string): Promise<{ data: TilesSlice.TileData[] }> {
  console.log(`fetching tiles from ${from} to ${to}...`);
  return new Promise((resolve) => {
    if (isTilesFetched) {
      setTimeout(() => resolve({ data: [] }), 500);
    } else {
      setTimeout(() => resolve({ data: Mocks.tiles }), 500);
    }
    isTilesFetched = true;
  });
}

export function postChangesAsync(changes: TilesSlice.ChangesMap): Promise<{ data: "ok" }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: "ok" }), 1000);
  });
}

export async function fetchPoliceData(date: string): Promise<{ data: Blob } | { error: string }> {
  try {
    const response = await fetch(`/api/export/police?date=${date}`);
    const data = await response.blob();
    return { data };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Unknown error while fetching" };
    }
  }
}
