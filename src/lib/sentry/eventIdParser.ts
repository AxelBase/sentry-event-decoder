export function validateEventId(eventId: string): { valid: boolean; message: string } {
  try {
    if (eventId.length !== 32) {
      return { valid: false, message: 'Event ID must be exactly 32 characters long.' };
    }
    if (!/^[0-9a-fA-F]{32}$/.test(eventId)) {
      return { valid: false, message: 'Event ID must contain only hexadecimal characters (0-9, a-f, A-F).' };
    }
    return { valid: true, message: 'Valid Event ID.' };
  } catch (err) {
    console.error('Validation error:', err);
    return { valid: false, message: 'Validation failed due to internal error.' };
  }
}

export function buildEventUrl(orgSlug: string, projectSlug: string, eventId: string): string {
  try {
    if (!orgSlug || !projectSlug) {
      throw new Error('Org slug and project slug are required.');
    }
    return `https://sentry.io/api/0/projects/${orgSlug}/${projectSlug}/events/${eventId}/json/`;
  } catch (err) {
    console.error('Build URL error:', err);
    return '';
  }
}