const BACKEND = process.env.REACT_APP_BACKEND ?? "http://localhost:8000";

export function withBackendUrl(pathOrUrl?: string | null): string {
  const p = (pathOrUrl ?? "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;

  if (p.startsWith("/")) return `${BACKEND}${p}`;
  return `${BACKEND}/${p}`;
}

export function firstPhotoUrl(...paths: Array<string | null | undefined>): string {
  for (const p of paths) {
    const url = withBackendUrl(p);
    if (url) return url;
  }
  return "";
}
