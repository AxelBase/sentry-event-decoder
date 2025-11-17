// src/lib/sentry/jsonFetcher.ts
export async function fetchEventJson(url: string): Promise<any | null> {
  try {
    console.log('%cFetching public event from Sentry...', 'color: #6f42c1; font-weight: bold;', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      // No auth headers – this is intentional (public endpoint)
    });

    if (response.status === 401 || response.status === 403) {
      console.warn('Sentry returned 401/403 – event is not publicly accessible (this is normal)');
      return null;
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('%cPublic event JSON loaded successfully!', 'color: green; font-weight: bold;');
    return data;

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.error('Network error – are you offline or blocking CORS?');
    } else {
      console.error('Failed to fetch event JSON:', error);
    }
    return null;
  }
}