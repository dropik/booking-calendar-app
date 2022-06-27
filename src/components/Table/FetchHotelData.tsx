import { useEffect } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { fetchAsync } from "../../redux/hotelSlice";

export default function FetchHotelData(): null {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  return null;
}
