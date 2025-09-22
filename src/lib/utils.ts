// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, isPast } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an endTime timestamp into a human-readable "time remaining" string.
 * @param endTime The market's end time, either as a string or a number (Unix timestamp).
 * @returns A string like "23 days left", "Ends in 5 hours", or "Ended".
 */
export function formatTimeRemaining(endTime: string | number): string {
  const endDate = new Date(endTime);

  if (isPast(endDate)) {
    return "Ended";
  }

  return `${formatDistanceToNow(endDate)} left`;
}