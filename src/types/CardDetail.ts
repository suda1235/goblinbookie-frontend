/**
 * Goblin Bookie – Card Detail Data Types
 *
 * This file defines all core TypeScript interfaces for card pricing, history, and vendor details
 * as used throughout the Goblin Bookie frontend.
 *
 * Includes:
 *  - VendorPrices: Holds buylist and retail prices for a card by finish for a single vendor.
 *  - Vendor:       Represents a single price source, including prices and a direct purchase URL.
 *  - PriceAggregates: Aggregated low, average, and high prices by finish (across all vendors).
 *  - HistoryEntry:  A single day's retail/buylist prices (by finish) for price charts and trends.
 *  - CardDetail:    Full detail object for a card, including vendor breakdowns and price history.
 *
 * All prices are `number | null` to allow for missing/unavailable vendor data.
 * All interfaces are written for easy extensibility and strong type safety in the frontend.
 */

export interface VendorPrices {
  retail: Record<string, number | null>;
  buylist: Record<string, number | null>;
}

export interface Vendor {
  vendor: string;
  purchaseUrl: string | null;
  prices: VendorPrices;
}

export interface PriceAggregates {
  [finish: string]: {
    low: number | null;
    avg: number | null;
    high: number | null;
  };
}

export interface HistoryEntry {
  date: string;
  retail: Record<string, number | null>;
  buylist: Record<string, number | null>;
}

export interface CardDetail {
  uuid: string;
  name: string;
  set: string;
  language: string;
  imageUrl: string;
  finishes: string[];
  prices: {
    retail: PriceAggregates;
    buylist: PriceAggregates;
  };
  vendors: Vendor[];
  history: HistoryEntry[];
}
