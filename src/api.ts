import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TileColor } from "./redux/tilesSlice";
import { RootState } from "./redux/store";
import { show as showSnackbarMessage } from "./redux/snackbarMessageSlice";
import { setTokens } from "./redux/authSlice";

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
  isBankTransfer: boolean,
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
};

export type AssignmentsRequest = {
  colors: ColorAssignments,
  rooms: RoomAssignments,
};

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

export type CurrentUser = {
  username: string,
  visibleName: string,
  roomTypes: RoomType[],
  roomRates: RoomRate[],
  floors: Floor[],
};

export type TokenRequest = {
  username: string,
  password: string,
};

export type TokenResponse = {
  accessToken: string,
  refreshToken: string,
};

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token !== "") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.meta?.response?.ok) {
    return result;
  }

  let errorMessage = "";
  if (result.error?.status === 401) {
    try {
      const auth = (api.getState() as RootState).auth;

      const refreshResult = await baseQuery(
        { url: "auth/refresh", method: "POST", body: auth, },
        api,
        extraOptions,
      );

      if (refreshResult.meta?.response?.ok && refreshResult.data) {
        api.dispatch(setTokens(refreshResult.data as TokenResponse));
        result = await baseQuery(args, api, extraOptions);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      errorMessage = "Errore di reautenticazione";
    }
  } else if (result.error?.status === 408) {
    errorMessage = "Errore di connessione";
  } else {
    if (result.error?.data && typeof(result.error?.data) === "object" && "message" in result.error.data) {
      errorMessage = (result.error.data.message as string) ?? "Server error";
    } else {
      errorMessage = "Server error";
    }
  }

  if (errorMessage && errorMessage !== "") {
    api.dispatch(showSnackbarMessage({ type: "error", message: errorMessage }));
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<CurrentUser, null>({
      query: () => "users/current",
    }),

    postAuthToken: builder.mutation<TokenResponse, TokenRequest>({
      query: (request: TokenRequest) => ({
        url: "auth/token",
        method: "POST",
        body: request,
      }),
    }),

    postFloor: builder.mutation<Floor, { name: string }>({
      query: (request) => ({
        url: "floors",
        method: "POST",
        body: request,
      }),
    }),

    putFloor: builder.mutation<Floor, Floor>({
      query: (request) => ({
        url: `floors/${request.id}`,
        method: "PUT",
        body: request,
      }),
    }),

    deleteFloor: builder.mutation<null, number>({
      query: (id) => ({
        url: `floors/${id}`,
        method: "DELETE",
      }),
    }),

    postRoom: builder.mutation<Room, { floorId: number, number: string, type: string }>({
      query: (request) => ({
        url: "rooms",
        method: "POST",
        body: request,
      }),
    }),

    putRoom: builder.mutation<Room, Room>({
      query: (request) => ({
        url: `rooms/${request.id}`,
        method: "PUT",
        body: request,
      }),
    }),

    deleteRoom: builder.mutation<null, number>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
    }),

    getBookings: builder.query<Booking<number>[], { from: string, to: string}>({
      query: ({ from, to }) => `bookings?from=${from}&to=${to}`,
    }),

    postAssignments: builder.mutation<null, AssignmentsRequest>({
      query: (request) => ({
        url: "assignments",
        method: "POST",
        body: request,
      }),
    }),

    postColorAssignments: builder.mutation<null, ColorAssignments>({
      query: (request) => ({
        url: "assignments/colors",
        method: "POST",
        body: request,
      }),
    }),
  }),
});

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
