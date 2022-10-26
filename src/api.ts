import { TileColor } from "./redux/tilesSlice";

export type CityTaxData = {
  standard: number,
  children: number,
  over10Days: number
};

export type Booking<TPerson> = {
  id: string,
  status: "new" | "modified" | "cancelled",
  name: string,
  lastModified: string,
  from: string,
  to: string,
  color?: TileColor,
  tiles: Tile<TPerson>[]
};

export type Tile<TPerson> = {
  id: string,
  from: string,
  nights: number,
  roomType: string,
  entity: string,
  persons: TPerson,
  roomId?: number
};

export type BookingShort = {
  id: string,
  status: "new" | "modified" | "cancelle",
  name: string,
  lastModified: string,
  from: string,
  to: string,
  color: TileColor
  occupations: number,
};

export type Client = {
  id: string,
  bookingId: string,
  name: string,
  surname: string,
  dateOfBirth: string,
  placeOfBirth?: string,
  stateOfBirth?: string
};

export type ClientWithBooking = {
  bookingName: string,
  bookingFrom: string,
  bookingTo: string
} & Client;

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

export type AckBookingsRequest = {
  bookings: {
    bookingId: string,
    lastModified: string
  }[],
  sessionId: string
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

export function fetchBookingsBySessionAsync(from: string, to: string, sessionId?: string): Promise<{ data: { bookings: Booking<number>[], sessionId: string } }> {
  return fetchJsonDataAsync<{ bookings: Booking<number>[], sessionId: string }>(`/api/v1/bookings-by-session?from=${from}&to=${to}${sessionId ? `&sessionId=${sessionId}` : ""}`);
}

export function ackBookingsAsync(request: AckBookingsRequest): Promise<void> {
  return postDataAsync("/api/v1/ack-bookings", request);
}

export function postColorAssignments(assignments: ColorAssignments): Promise<void> {
  return postDataAsync("/api/v1/color-assignments", assignments);
}

export function postRoomAssignmentsAsync(assignments: RoomAssignments): Promise<void> {
  return postDataAsync("/api/v1/room-assignments", assignments);
}

export async function fetchBookingById(bookingId: string, from: string): Promise<{ data: Booking<Client[]> }> {
  return fetchJsonDataAsync<Booking<Client[]>>(`/api/v1/booking?id=${bookingId}&from=${from}`);
}

export async function fetchClientsByTile(tileId: string): Promise<{ data: Client[] }> {
  return fetchJsonDataAsync<Client[]>(`/api/v1/clients-by-tile?tileId=${tileId}`);
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

export async function fetchBookings(name: string, from: string, to: string): Promise<{ data: BookingShort[] }> {
  return fetchJsonDataAsync<BookingShort[]>(`/api/v1/bookings-by-name?name=${name}&from=${from}&to=${to}`);
}

export async function fetchClientsByQuery(query: string): Promise<{ data: ClientWithBooking[] }> {
  return fetchJsonDataAsync<ClientWithBooking[]>(`/api/v1/clients-by-query?query=${query}`);
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
