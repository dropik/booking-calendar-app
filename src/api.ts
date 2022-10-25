import { TileColor } from "./redux/tilesSlice";

export type CityTaxData = {
  standard: number,
  children: number,
  over10Days: number
};

export type TileData = {
  id: string,
  bookingId: string,
  lastModified: string,
  name: string,
  from: string,
  nights: number,
  roomType: string,
  entity: string,
  persons: number,
  color?: TileColor,
  roomId?: number
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

export type Room = {
  id: number,
  floorId: number,
  number: string,
  type: string
};

export type Floor = {
  id: number,
  name: string,
  rooms: Room[]
};

export type RoomType = {
  name: string,
  minOccupancy: number,
  maxOccupancy: number,
};

export type ColorAssignments = {
  [key: string]: TileColor
};

export type RoomAssignments = {
  [key: string]: number | null
}

export function fetchFloorsAsync(): Promise<{ data: Floor[] }> {
  return fetchJsonDataAsync<Floor[]>("/api/v1/floors");
}

export function postFloorAsync(floor: { name: string }): Promise<{ id: number }> {
  return postDataAsync("/api/v1/floors", floor);
}

export function putFloorAsync(floor: Floor): Promise<void> {
  return putDataAsync(`api/v1/floors/${floor.id}`, floor);
}

export function deleteFloorAsync(id: number): Promise<void> {
  return deleteDataAsync(`api/v1/floors/${id}`);
}

export function postRoomAsync(room: { floorId: number, number: string, type: string }): Promise<{ id: number }> {
  return postDataAsync("api/v1/rooms", room);
}

export function putRoomAsync(room: Room): Promise<void> {
  return putDataAsync(`api/v1/rooms/${room.id}`, room);
}

export function deleteRoomAsync(id: number): Promise<void> {
  return deleteDataAsync(`api/v1/rooms/${id}`);
}

export function fetchRoomTypesAsync(): Promise<{ data: RoomType[] }> {
  return fetchJsonDataAsync<RoomType[]>("/api/v1/room-types");
}

export function fetchTilesAsync(from: string, to: string, sessionId?: string): Promise<{ data: { tiles: TileData[], sessionId: string } }> {
  return fetchJsonDataAsync<{ tiles: TileData[], sessionId: string }>(`/api/v1/tiles?from=${from}&to=${to}${sessionId ? `&sessionId=${sessionId}` : ""}`);
}

export function postColorAssignments(assignments: ColorAssignments): Promise<void> {
  return postDataAsync("/api/v1/color-assignments", assignments);
}

export function postRoomAssignmentsAsync(assignments: RoomAssignments): Promise<void> {
  return postDataAsync("/api/v1/room-assignments", assignments);
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

export async function fetchBookings(name: string, from: string, to: string): Promise<{ data: BookingShortData[] }> {
  return fetchJsonDataAsync<BookingShortData[]>(`/api/v1/bookings?name=${name}&from=${from}&to=${to}`);
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

async function postDataAsync<TData, TResponse>(url: string, data: TData): Promise<TResponse> {
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
  const responseData = await response.json() as TResponse;
  if (!responseData) {
    throw new Error("Response erorr");
  }
  return responseData;
}

async function putDataAsync<T>(url: string, data: T): Promise<void> {
  const response = await fetch(url, {
    method: "PUT",
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

async function deleteDataAsync(url: string): Promise<void> {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer"
  });
  if (!response.ok) {
    throw new Error("Response error");
  }
}
