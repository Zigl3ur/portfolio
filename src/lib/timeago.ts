import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";
import en from "timeago.js/lib/lang/en_US";

timeago.register("fr", fr);
timeago.register("en", en);

export const { format } = timeago;
