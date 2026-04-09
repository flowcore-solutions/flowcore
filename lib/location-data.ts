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
    id: "chennai-hq",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    type: "headquarters",
    address: "FlowCore Solutions, Industrial Zone, Anna Salai, Chennai – 600 002",
    phone: "+91 44 0000 0000",
    email: "info@flowcoresolutions.in",
    coordinates: { lat: 13.0827, lng: 80.2707 },
  },
  {
    id: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    type: "branch",
    address: "Andheri East, MIDC Industrial Area, Mumbai – 400 093",
    phone: "+91 22 0000 0000",
    email: "mumbai@flowcoresolutions.in",
    coordinates: { lat: 19.076, lng: 72.8777 },
  },
  {
    id: "delhi",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    type: "branch",
    address: "Okhla Industrial Estate Phase III, New Delhi – 110 020",
    phone: "+91 11 0000 0000",
    email: "delhi@flowcoresolutions.in",
    coordinates: { lat: 28.6139, lng: 77.209 },
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    type: "distribution",
    address: "IDA Jeedimetla, Hyderabad – 500 055",
    coordinates: { lat: 17.385, lng: 78.4867 },
  },
  {
    id: "bangalore",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    type: "distribution",
    address: "Peenya Industrial Area, Bengaluru – 560 058",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    type: "distribution",
    address: "Sector V, Salt Lake, Kolkata – 700 091",
    coordinates: { lat: 22.5726, lng: 88.3639 },
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
