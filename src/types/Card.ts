/**
 * Card – Goblin Bookie
 *
 * Represents a summary view of a Magic: The Gathering card.
 * Used for search results and card lists (not full detail page).
 */

export interface Card {
  uuid: string;
  name: string;
  set: string;
  imageUrl: string;
  avgRetail: number | null;
  avgBuylist: number | null;
  weeklyChangePct: number | null;
}
