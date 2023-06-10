export interface UpdateEvent extends Record<string, number | string> {
  e: string;
  E: number;
  s: string;
}

export type EventCallback<T extends UpdateEvent = UpdateEvent> = (
  data: T | T[],
) => void;
