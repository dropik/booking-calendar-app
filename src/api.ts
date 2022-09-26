import { HotelData } from "./redux/hotelSlice";
import { RoomTypeData } from "./redux/roomTypesSlice";
import { ChangesMap, TileColor, TileData } from "./redux/tilesSlice";

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
  rooms: TileData[]
};

export type BookingShortData = {
  id: string,
  name: string,
  from: string,
  to: string,
  occupations: number,
  color: TileColor
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

export function fetchTilesAsync(from: string, to: string): Promise<{ data: TileData[] }> {
  return fetchJsonDataAsync<TileData[]>(`/api/get/tiles?from=${from}&to=${to}`);
}

export function postChangesAsync(changes: ChangesMap): Promise<void> {
  return postDataAsync("/api/post/changes", changes);
}

export async function fetchBookingById(bookingId: string): Promise<{ data: BookingData }> {
  return fetchJsonDataAsync<BookingData>(`/api/get/booking?id=${bookingId}`);
}

export async function fetchClientsByTile(tileId: string): Promise<{ data: ClientShortData[] }> {
  return fetchJsonDataAsync<ClientShortData[]>(`/api/get/clients?tileId=${tileId}`);
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

async function postDataAsync<T>(url: string, data: T): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Response error");
  }
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(500);
}
