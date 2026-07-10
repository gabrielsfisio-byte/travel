import type { CompletedTrip } from "@/types";

function dateKey(iso: string) {
  return new Date(iso).toDateString();
}

/** Counts consecutive days (ending today or yesterday) with at least one completed trip. */
export function computeStreak(trips: CompletedTrip[]): number {
  if (trips.length === 0) return 0;

  const uniqueDays = Array.from(new Set(trips.map((t) => dateKey(t.createdAt))))
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mostRecent = uniqueDays[0];
  const diffFromToday = Math.round((today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));

  // Streak is only "alive" if the most recent trip was today or yesterday.
  if (diffFromToday > 1) return 0;

  let streak = 1;
  for (let i = 0; i < uniqueDays.length - 1; i++) {
    const diff = Math.round((uniqueDays[i].getTime() - uniqueDays[i + 1].getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}
