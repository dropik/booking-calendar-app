import { HotelData } from "./redux/hotelSlice";
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

export type ClientData = {
  id: string,
  bookingId: string,
  name: string,
  surname: string,
  dateOfBirth: string,
  placeOfBirth?: string,
  stateOfBirth?: string
};

export type RoomType = {
  name: string,
  minOccupancy: number,
  maxOccupancy: number,
};

export function fetchHotelDataAsync(): Promise<{ data: HotelData }> {
  return fetchJsonDataAsync<HotelData>("/api/v1/hotel");
}

export function fetchRoomTypesAsync(): Promise<{ data: RoomType[] }> {
  return fetchJsonDataAsync<RoomType[]>("/api/v1/room-types");
}

export function fetchTilesAsync(from: string, to: string, sessionId?: string): Promise<{ data: { tiles: TileData[], sessionId: string } }> {
  return fetchJsonDataAsync<{ tiles: TileData[], sessionId: string }>(`/api/v1/tiles?from=${from}&to=${to}${sessionId ? `&sessionId=${sessionId}` : ""}`);
}

export function postChangesAsync(changes: ChangesMap): Promise<void> {
  return postDataAsync("/api/v1/changes", changes);
}

export async function fetchBookingById(bookingId: string): Promise<{ data: BookingData }> {
  return fetchJsonDataAsync<BookingData>(`/api/v1/booking?id=${bookingId}`);
}

export async function fetchBookingShortById(bookingId: string): Promise<{ data: BookingShortData}> {
  return fetchJsonDataAsync<BookingShortData>(`/api/v1/booking-short?id=${bookingId}`);
}

export async function fetchClientsByTile(tileId: string): Promise<{ data: ClientData[] }> {
  return fetchJsonDataAsync<ClientData[]>(`/api/v1/clients?tileId=${tileId}`);
}

export async function fetchPoliceDataAsync(date: string): Promise<{ data: Blob }> {
  return fetchBlobDataAsync(`/api/v1/stats/police?date=${date}`);
}

export async function fetchIstatDataAsync(date: string): Promise<{ data: Blob }> {
  return fetchBlobDataAsync(`/api/v1/stats/istat?date=${date}`);
}

export async function fetchCityTaxAsync(from: string, to: string): Promise<{ data: CityTaxData }> {
  return fetchJsonDataAsync<CityTaxData>(`/api/v1/stats/city-tax?from=${from}&to=${to}`);
}

export async function fetchBookings(nameOrId: string, from: string, to: string): Promise<{ data: BookingShortData[] }> {
  return fetchJsonDataAsync<BookingShortData[]>(`/api/v1/bookings?nameOrId=${nameOrId}&from=${from}&to=${to}`);
}

export async function fetchClients(query: string): Promise<{ data: ClientData[] }> {
  return fetchJsonDataAsync<ClientData[]>(`/api/v1/clients?query=${query}`);
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
}
