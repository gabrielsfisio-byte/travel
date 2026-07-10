"use client";

import { useTravelStore } from "@/store/travel-store";
import { getTodayChallenge, isChallengeCompletedToday } from "@/lib/daily-challenge";
import { DailyChallengeCard } from "./daily-challenge-card";

export function DailyChallengeSection() {
  const completedTrips = useTravelStore((s) => s.completedTrips);
  const challenge = getTodayChallenge();
  const completed = isChallengeCompletedToday(challenge, completedTrips);

  return <DailyChallengeCard challenge={challenge} completed={completed} />;
}
