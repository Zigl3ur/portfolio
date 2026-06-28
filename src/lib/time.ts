import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";
import en from "timeago.js/lib/lang/en_US";

timeago.register("fr", fr);
timeago.register("en", en);

export const { format } = timeago;

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}
