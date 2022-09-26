import * as Mocks from "./mocks";
import * as TilesSlice from "./redux/tilesSlice";
import { HotelData } from "./redux/hotelSlice";
import { RoomTypeData } from "./redux/roomTypesSlice";

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
  rooms: TilesSlice.TileData[]
};

export type BookingShortData = {
  id: string,
  name: string,
  from: string,
  to: string,
  occupations: number,
  color: TilesSlice.TileColor
};

export type DocumentType = "identityCard" | "drivingLicense" | "passport";

export type ClientData = {
  id: string,
  name: string,
  surname: string,
  dateOfBirth: string,
  placeOfBirth: string,
  stateOfBirth: string,
  documentNumber: string,
  documentType: DocumentType,
  booking: BookingShortData
};

export type ClientShortData = {
  id: string,
  bookingId: string,
  bookingName: string,
  name: string,
  surname: string,
  dateOfBirth: string,
  placeOfBirth?: string,
  stateOfBirth?: string
};

export function fetchHotelDataAsync(): Promise<{ data: HotelData }> {
  return fetchJsonDataAsync<HotelData>("/api/get/hotel");
}

export function fetchRoomTypesAsync(): Promise<{ data: RoomTypeData }> {
  return fetchJsonDataAsync<RoomTypeData>("/api/get/room-types");
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

export async function fetchBookingByTile(tileId: string): Promise<{ data: BookingData }> {
  return fetchJsonDataAsync<BookingData>(`/api/get/booking?tileId=${tileId}`);
}

export async function fetchBookingById(bookingId: string): Promise<{ data: BookingData }> {
  return fetchJsonDataAsync<BookingData>(`/api/get/booking?id=${bookingId}`);
}

export async function fetchClientsByTile(tileId: string): Promise<{ data: ClientShortData[] }> {
  return fetchJsonDataAsync<ClientShortData[]>(`/api/get/clients?tileId=${tileId}`);
}

export async function fetchClient(bookingId: string, clientId: string): Promise<{ data: ClientData }> {
  return fetchJsonDataAsync<ClientData>(`/api/get/client?bookingId=${bookingId}&clientId=${clientId}`);
}

export async function fetchPoliceDataAsync(date: string): Promise<{ data: Blob }> {
  return fetchBlobDataAsync(`/api/export/police?date=${date}`);
}

export async function fetchIstatDataAsync(date: string): Promise<{ data: Blob }> {
  return fetchBlobDataAsync(`/api/export/istat?date=${date}`);
}

export async function fetchCityTaxAsync(from: string, to: string): Promise<{ data: CityTaxData }> {
  return fetchJsonDataAsync<CityTaxData>(`/api/calc/tax?from=${from}&to=${to}`);
}

export async function fetchBookings(nameOrId: string, from: string, to: string): Promise<{ data: BookingShortData[] }> {
  return fetchJsonDataAsync<BookingShortData[]>(`/api/find/bookings?nameOrId=${nameOrId}&from=${from}&to=${to}`);
}

export async function fetchClients(query: string): Promise<{ data: ClientData[] }> {
  return fetchJsonDataAsync<ClientData[]>(`/api/find/clients?query=${query}`);
}

async function fetchBlobDataAsync(query: string): Promise<{ data: Blob }> {
  const response = await fetch(query);
  if (!response.ok) {
    throw new Error("Resopnse error");
  }
  const data = await response.blob();
  return { data };
}

async function fetchJsonDataAsync<T>(query: string): Promise<{ data: T }> {
  const response = await fetch(query);
  if (!response.ok) {
    throw new Error("Response error");
  }
  const data = await response.json() as T;
  if (!data) {
    throw new Error("Response error");
  }
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(500);
  return { data };
}
