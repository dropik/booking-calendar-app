export type MovementEntry = {
  id: string,
  targa?: string,
  arrivals?: number,
  departures?: number,
};

export type MovementsList = {
  [key: string]: MovementEntry,
};
