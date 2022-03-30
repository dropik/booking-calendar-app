import * as Mocks from "./mocks";
import * as HotelSlice from "./redux/hotelSlice";
import * as TilesSlice from "./redux/tilesSlice";
import * as RoomTypesSlice from "./redux/roomTypesSlice";

export type CityTaxData = {
  standard: number,
  children: number,
  over10Days: number
};

export type BookingData = {
  id: string,
  name: string,
  from: string,
  to: string,
  rooms: {
    id: string,
    type: string,
    entity: string,
    from: string,
    to: string,
    roomNumber?: number,
    guests: {
      id: string,
      name: string,
      surname: string,
      dateOfBirth: string
    }[]
  }[]
};

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

export async function fetchPoliceDataAsync(date: string): Promise<{ data: Blob }> {
  const response = await fetch(`/api/export/police?date=${date}`);
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.blob();
  return { data };
}

export async function fetchIstatDataAsync(date: string): Promise<{ data: Blob }> {
  const response = await fetch(`/api/export/istat?date=${date}`);
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.blob();
  return { data };
}

export async function fetchCityTaxAsync(from: string, to: string): Promise<{ data: CityTaxData }> {
  const response = await fetch(`/api/calc/tax?from=${from}&to=${to}`);
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.json() as CityTaxData;
  if (!data) {
    throw new Error("Response error");
  }
  return { data };
}
