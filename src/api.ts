import mocks from "./mocks";
import { HotelData } from "./redux/hotelSlice";

export function fetchHotelDataAsync() {
  return new Promise<{ data: HotelData }>((resolve) => {
    setTimeout(() => resolve({ data: mocks.hotel }), 500);
  });
}
