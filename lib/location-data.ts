// FlowCore office and distribution location data.
// Consumed by the Contact page's LocationCards and SVG India map.
// Coordinates (lat/lng) are approximate and used only for SVG dot positioning
// — not for any real geolocation or mapping SDK.

export type LocationType = "headquarters" | "branch" | "distribution";

export type OfficeLocation = {
  /** Unique slug — used as React key */
  id: string;
  city: string;
  state: string;
  country: string;
  type: LocationType;
  address: string;
  phone?: string;
  email?: string;
  /**
   * Approximate geographic coordinates for SVG India map dot placement.
   * These are NOT used with any mapping SDK.
   */
  coordinates: {
    /** Latitude (decimal degrees, N positive) */
    lat: number;
    /** Longitude (decimal degrees, E positive) */
    lng: number;
  };
};

export const OFFICE_LOCATIONS: readonly OfficeLocation[] = [
  {
    id: "bangalore",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    type: "headquarters",
    address: "No. 65/1A, Cheluva Complex, Kottigepalya, Magadi Main Road, Vishwaneedam Post, Bangalore – 560 091",
    phone: "8618885283",
    email: "flowcoresolutionsblr@gmail.com",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
];


// ── Derived helpers ───────────────────────────────────────────────────

/**
 * Returns the single headquarters location.
 * Throws if no HQ is found — this is a configuration invariant.
 */
export function getHeadquarters(): OfficeLocation {
  const hq = OFFICE_LOCATIONS.find((loc) => loc.type === "headquarters");
  if (!hq) {
    throw new Error(
      "No headquarters defined in OFFICE_LOCATIONS. Add one with type: 'headquarters'."
    );
  }
  return hq;
}

/**
 * Returns all locations of a given type.
 */
export function getLocationsByType(
  type: LocationType
): readonly OfficeLocation[] {
  return OFFICE_LOCATIONS.filter((loc) => loc.type === type);
}

/**
 * Converts a lat/lng pair to approximate (x, y) percentage coordinates
 * suitable for plotting on an SVG map of India.
 *
 * Bounds used (approximate India bounding box):
 *   Lat: 6.5°N – 37.5°N
 *   Lng: 68°E – 97.5°E
 *
 * Returns values in the range [0, 100] (percentage of SVG dimensions).
 */
export function coordsToSvgPercent(
  lat: number,
  lng: number
): { x: number; y: number } {
  const LAT_MIN = 6.5;
  const LAT_MAX = 37.5;
  const LNG_MIN = 68;
  const LNG_MAX = 97.5;

  // SVG y-axis is inverted (0 = top, 100 = bottom)
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  };
}
