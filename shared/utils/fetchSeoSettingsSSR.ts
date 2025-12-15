import { UPLOADS_URL } from "@/constants";

export async function fetchSeoSettingsSSR(pagePath: string) {
  const backendUrl = UPLOADS_URL;
  try {
    const res = await fetch(
      `${backendUrl}/api/site-seo-settings/by-path?path=${encodeURIComponent(
        pagePath
      )}`,
      {
        next: { revalidate: 60 },
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
