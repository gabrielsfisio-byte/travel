export interface FriendChallengePayload {
  destinationId: string;
  destinationCity: string;
  budget: number;
}

export function encodeChallenge(payload: FriendChallengePayload): string {
  const json = JSON.stringify(payload);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeChallenge(encoded: string): FriendChallengePayload | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json) as FriendChallengePayload;
  } catch {
    return null;
  }
}
