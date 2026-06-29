import { format, register } from "timeago.js";
import fr from "timeago.js/esm/lang/fr.js";
import en from "timeago.js/esm/lang/en_US.js";

register("fr", fr);
register("en", en);

export { format };

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}
