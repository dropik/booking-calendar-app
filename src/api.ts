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

    // auth

    postAuthToken: builder.mutation<TokenResponse, TokenRequest>({
      query: (request: TokenRequest) => ({
        url: "auth/token",
        method: "POST",
        body: request,
      }),
    }),

    // user

    getCurrentUser: builder.query<CurrentUser, null>({
      query: () => "users/current",
    }),

    // floors

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

    // rooms

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

    // bookings

    getBookings: builder.query<Booking<number>[], { from: string, to: string}>({
      query: ({ from, to }) => `bookings?from=${from}&to=${to}`,
    }),

    getBookingsByName: builder.query<BookingShort[], { name: string, from: string, to: string }>({
      query: ({ name, from, to }) => `bookings/by-name?name=${name}&from=${from}&to=${to}`,
    }),

    getBooking: builder.query<Booking<Client[]>, { bookingId: string, from: string }>({
      query: ({ bookingId, from }) => `bookings/${bookingId}?from=${from}`,
    }),

    // assignments

    postAssignments: builder.mutation<null, AssignmentsRequest>({
      query: (request) => ({
        url: "assignments",
        method: "POST",
        body: request,
      }),
    }),

    // clients

    getClientsByTile: builder.query<Client[], { bookingId: string, tileId: string }>({
      query: ({ bookingId, tileId }) => `clients/by-tile?bookingId=${bookingId}&tileId=${tileId}`,
    }),

    getClientsByQuery: builder.query<ClientWithBooking[], { query: string, from: string, to: string }>({
      query: ({ query, from, to }) => `clients/by-query?query=${query}&from=${from}&to=${to}`,
    }),

    // police

    postPoliceRicevuta: builder.mutation<null, { date: string }>({
      query: (request) => ({
        url: "police",
        method: "POST",
        body: request,
      }),
    }),
  }),
});

export async function postIstatExportRequestAsync(date: string): Promise<void> {
  return postDataWithoutResponseAsync("/api/v1/istat", { date });
}

export async function fetchCityTaxAsync(from: string, to: string): Promise<{ data: CityTaxData }> {
  return fetchJsonDataAsync<CityTaxData>(`/api/v1/city-tax?from=${from}&to=${to}`);
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
