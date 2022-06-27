import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchAsync } from "../../redux/roomTypesSlice";

export default function FetchRoomTypes(): null {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  return null;
}
