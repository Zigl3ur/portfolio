export function apiUrl(path?: string) {
  const baseUrl = import.meta.env.PUBLIC_API_URL || "http://localhost:8080";
  return `${baseUrl}${path ? path : ""}`;
}
