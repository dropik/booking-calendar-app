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
  deposit: number,
  depositConfirmed: boolean,
  color?: TileColor,
  tiles: Tile<TPerson>[]
};

export type Tile<TPerson> = {
  id: string,
  from: string,
  nights: number,
  roomType: string,
  persons: TPerson,
  roomId?: number,
  rateId: string,
};

export type BookingShort = {
  id: string,
  status: "new" | "modified" | "cancelle",
  name: string,
  lastModified: string,
  from: string,
  to: string,
  color?: TileColor
  occupations: number,
};

export type Client = {
  id: string,
  bookingId: string,
  name: string,
  surname: string,
  dateOfBirth: string,
  placeOfBirth?: string,
  provinceOfBirth?: string,
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

export type RoomRate = {
  rateId: string,
  minOccupancy: number,
  maxOccupancy: number,
  baseBoard: string,
};

export type RoomRatesResponse = {
  roomTypes: RoomType[],
  roomRates: RoomRate[],
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

export type Movement = {
  italia: boolean,
  targa: string,
  arrivi: number,
  partenze: number,
};

export type MovementDTO = {
  date: string,
  prevTotal: number,
  movements: Movement[],
};

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

export function fetchRoomRatesAsync(): Promise<{ data: RoomRatesResponse }> {
  return fetchJsonDataAsync<RoomRatesResponse>("/api/v1/room-rates");
}

export function fetchBookingsBySessionAsync(from: string, to: string, sessionId?: string): Promise<{ data: { bookings: Booking<number>[], sessionId: string } }> {
  return fetchJsonDataAsync<{ bookings: Booking<number>[], sessionId: string }>(`/api/v1/bookings-by-session?from=${from}&to=${to}${sessionId ? `&sessionId=${sessionId}` : ""}`);
}

export function ackBookingsAsync(request: AckBookingsRequest): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/ack-bookings", request);
}

export function postColorAssignments(assignments: ColorAssignments): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/color-assignments", assignments);
}

export function postRoomAssignmentsAsync(assignments: RoomAssignments): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/room-assignments", assignments);
}

export async function fetchBookingById(bookingId: string, from: string): Promise<{ data: Booking<Client[]> }> {
  return fetchJsonDataAsync<Booking<Client[]>>(`/api/v1/booking?id=${bookingId}&from=${from}`);
}

export async function fetchClientsByTile(bookingId: string, tileId: string): Promise<{ data: Client[] }> {
  return fetchJsonDataAsync<Client[]>(`/api/v1/clients-by-tile?bookingId=${bookingId}&tileId=${tileId}`);
}

export async function postPoliceExportRequestAsync(date: string): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/police", { date });
}

export async function postIstatExportRequestAsync(date: string): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/istat", { date });
}

export async function fetchPoliceRicevutaAsync(date: string): Promise<{ data: Blob }> {
  return fetchBlobDataAsync(`/api/v1/police/ricevuta?date=${date}`);
}

export async function fetchCityTaxAsync(from: string, to: string): Promise<{ data: CityTaxData }> {
  return fetchJsonDataAsync<CityTaxData>(`/api/v1/city-tax?from=${from}&to=${to}`);
}

export async function fetchBookings(name: string, from: string, to: string): Promise<{ data: BookingShort[] }> {
  return fetchJsonDataAsync<BookingShort[]>(`/api/v1/bookings-by-name?name=${name}&from=${from}&to=${to}`);
}

export async function fetchClientsByQuery(query: string, from: string, to: string): Promise<{ data: ClientWithBooking[] }> {
  return fetchJsonDataAsync<ClientWithBooking[]>(`/api/v1/clients-by-query?query=${query}&from=${from}&to=${to}`);
}

export async function fetchIstatMovementsAsync(): Promise<{ data: MovementDTO }> {
  return fetchJsonDataAsync<MovementDTO>("/api/v1/istat/movements");
}

export async function postIstatMovementsAsync(data: MovementDTO): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/istat/send", data);
}

export async function fetchCountriesAsync(): Promise<{ data: string[] }> {
  return fetchJsonDataAsync<string[]>("/api/v1/istat/countries");
}

export async function fetchProvincesAsync(): Promise<{ data: string[] }> {
  return fetchJsonDataAsync<string[]>("/api/v1/police/provinces");
}

async function fetchJsonDataAsync<T>(query: string): Promise<{ data: T }> {
  const response = await fetch(query);
  if (response.status === 408) {
    throw new Error("Errore di conessione!");
  }
  if (!response.ok) {
    let message = "";
    try {
      const json = await response.clone().json();
      message = json.message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Server error! ${message}`);
  }
  const data = await response.json() as T;
  if (!data) {
    throw new Error("Server error!");
  }
  return { data };
}

async function fetchBlobDataAsync(query: string): Promise<{ data: Blob }> {
  const response = await fetch(query);
  if (response.status === 408) {
    throw new Error("Errore di conessione!");
  }
  if (!response.ok) {
    let message = "";
    try {
      const json = await response.clone().json();
      message = json.message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Server error! ${message}`);
  }
  const data = await response.blob();
  return { data };
}

async function postDataWithoutResponseAsync<TData>(url: string, data: TData): Promise<void> {
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
  if (response.status === 408) {
    throw new Error("Errore di conessione!");
  }
  if (!response.ok) {
    let message = "";
    try {
      const json = await response.clone().json();
      message = json.message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Server error! ${message}`);
  }
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
  if (response.status === 408) {
    throw new Error("Errore di conessione!");
  }
  if (!response.ok) {
    let message = "";
    try {
      const json = await response.clone().json();
      message = json.message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Server error! ${message}`);
  }
  const responseData = await response.json() as TResponse;
  if (!responseData) {
    throw new Error("Server error!");
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
  if (response.status === 408) {
    throw new Error("Errore di conessione!");
  }
  if (!response.ok) {
    let message = "";
    try {
      const json = await response.clone().json();
      message = json.message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Server error! ${message}`);
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
  if (response.status === 408) {
    throw new Error("Errore di conessione!");
  }
  if (!response.ok) {
    let message = "";
    try {
      const json = await response.clone().json();
      message = json.message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Server error! ${message}`);
  }
}
