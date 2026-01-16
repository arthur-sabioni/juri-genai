export const JURIMETRY_API_BASE_URL = import.meta.env.VITE_JURIMETRY_API_BASE_URL;

if (!JURIMETRY_API_BASE_URL) {
  throw new Error("Missing JURIMETRY_API_BASE_URL");
}