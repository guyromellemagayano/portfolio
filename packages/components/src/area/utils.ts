// This file contains utility functions for the Area component
// that are separated for better maintainability and reusability

export type AreaShape = "rect" | "circle" | "poly" | "default";

/** Type-safe coordinate definitions for different shapes */
export type RectCoords = `${number},${number},${number},${number}`;
export type CircleCoords = `${number},${number},${number}`;
export type PolyCoords = string;
export type DefaultCoords = undefined;

export type AreaCoords<T extends AreaShape> = T extends "rect"
  ? RectCoords
  : T extends "circle"
    ? CircleCoords
    : T extends "poly"
      ? PolyCoords
      : T extends "default"
        ? DefaultCoords
        : string;

// =============================================================================
// COORDINATE VALIDATION UTILITIES
// =============================================================================

/**
 * Validates rectangular coordinates in format: x1,y1,x2,y2
 * Ensures x2 > x1, y2 > y1, and all values are non-negative numbers
 */
export function validateRectCoords(coords: string): boolean {
  const parts = coords.split(",").map(Number);
  if (parts.length !== 4) return false;
  const [x1, y1, x2, y2] = parts;
  return x2! > x1! && y2! > y1! && parts.every((n) => !isNaN(n) && n >= 0);
}

/**
 * Validates circular coordinates in format: x,y,radius
 * Ensures radius > 0 and all values are non-negative numbers
 */
export function validateCircleCoords(coords: string): boolean {
  const parts = coords.split(",").map(Number);
  if (parts.length !== 3) return false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_x, _y, r] = parts;
  return r! > 0 && parts.every((n) => !isNaN(n) && n >= 0);
}

/**
 * Validates polygon coordinates in format: x1,y1,x2,y2,x3,y3,...
 * Requires minimum 3 points (6 coordinates) and even number of coordinates
 */
export function validatePolyCoords(coords: string): boolean {
  const parts = coords.split(",").map(Number);
  return (
    parts.length >= 6 &&
    parts.length % 2 === 0 &&
    parts.every((n) => !isNaN(n) && n >= 0)
  );
}

/**
 * Validates coordinates based on the area shape type
 * Returns true for valid coordinates or when validation is not applicable
 */
export function validateCoordinates(
  shape: AreaShape,
  coords?: string
): boolean {
  if (!coords || shape === "default") return true;

  switch (shape) {
    case "rect":
      return validateRectCoords(coords);
    case "circle":
      return validateCircleCoords(coords);
    case "poly":
      return validatePolyCoords(coords);
    default:
      return true;
  }
}

// =============================================================================
// GEOMETRIC CALCULATIONS
// =============================================================================

/**
 * Calculates the area size in pixels² for analytics and touch optimization
 * Uses appropriate formula based on shape: rectangle, circle, or polygon (shoelace)
 */
export function calculateAreaSize(shape: AreaShape, coords?: string): number {
  if (!coords) return 0;

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return 0;
      return (parts[2]! - parts[0]!) * (parts[3]! - parts[1]!);
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return 0;
      return Math.PI * parts[2]! * parts[2]!;
    }
    case "poly": {
      // Shoelace formula for polygon area calculation
      const points = coords.split(",").map(Number);
      let area = 0;
      for (let i = 0; i < points.length; i += 2) {
        const j = (i + 2) % points.length;
        area += points[i]! * points[j + 1]!;
        area -= points[j]! * points[i + 1]!;
      }
      return Math.abs(area) / 2;
    }
    default:
      return 0;
  }
}

/**
 * Calculates the geometric center point for analytics and positioning
 * Returns centroid for rectangles/polygons, center for circles
 */
export function calculateCenterPoint(
  shape: AreaShape,
  coords?: string
): { x: number; y: number } | undefined {
  if (!coords) return undefined;

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return undefined;
      return { x: (parts[0]! + parts[2]!) / 2, y: (parts[1]! + parts[3]!) / 2 };
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return undefined;
      return { x: parts[0]!, y: parts[1]! };
    }
    case "poly": {
      const points = coords.split(",").map(Number);
      let x = 0,
        y = 0;
      for (let i = 0; i < points.length; i += 2) {
        x += points[i]!;
        y += points[i + 1]!;
      }
      return { x: x / (points.length / 2), y: y / (points.length / 2) };
    }
    default:
      return undefined;
  }
}

// =============================================================================
// ACCESSIBILITY & TOUCH OPTIMIZATION
// =============================================================================

/**
 * Checks if area meets minimum touch target requirements
 * Follows WCAG guidelines (44px minimum recommended)
 * Uses shape-specific calculations for accurate assessment
 */
export function checkTouchOptimization(
  shape: AreaShape,
  coords?: string,
  minSize = 44
): boolean {
  if (!coords) return false;

  const areaSize = calculateAreaSize(shape, coords);
  const minArea = minSize * minSize;

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return false;
      const width = parts[2]! - parts[0]!;
      const height = parts[3]! - parts[1]!;
      return width >= minSize && height >= minSize;
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return false;
      return parts[2]! >= minSize / 2;
    }
    default:
      return areaSize >= minArea;
  }
}

// =============================================================================
// COORDINATE GENERATION UTILITIES
// =============================================================================

/**
 * Creates type-safe rectangular coordinates
 */
export function createRectCoords(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): RectCoords {
  return `${x1},${y1},${x2},${y2}`;
}

/**
 * Creates type-safe circular coordinates
 */
export function createCircleCoords(
  x: number,
  y: number,
  r: number
): CircleCoords {
  return `${x},${y},${r}`;
}

/**
 * Creates polygon coordinates from array of points
 */
export function createPolyCoords(
  points: Array<{ x: number; y: number }>
): PolyCoords {
  return points.map((p) => `${p.x},${p.y}`).join(",");
}

/**
 * Converts percentage-based coordinates to absolute pixel coordinates
 */
export function percentToAbsolute(
  coords: string,
  imageWidth: number,
  imageHeight: number
): string {
  const parts = coords.split(",").map(Number);
  const result: number[] = [];

  for (let i = 0; i < parts.length; i += 2) {
    const x = (parts[i]! / 100) * imageWidth;
    const y = (parts[i + 1]! / 100) * imageHeight;
    result.push(x, y);
  }

  return result.join(",");
}

/**
 * Expands area coordinates to meet minimum touch target size
 */
export function expandForTouch(
  shape: AreaShape,
  coords: string,
  minSize = 44
): string {
  if (checkTouchOptimization(shape, coords, minSize)) {
    return coords; // Already optimal
  }

  switch (shape) {
    case "rect": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 4) return coords;

      const [x1, y1, x2, y2] = parts;
      const width = x2! - x1!;
      const height = y2! - y1!;

      const expandX = Math.max(0, (minSize - width) / 2);
      const expandY = Math.max(0, (minSize - height) / 2);

      return `${x1! - expandX},${y1! - expandY},${x2! + expandX},${y2! + expandY}`;
    }
    case "circle": {
      const parts = coords.split(",").map(Number);
      if (parts.length !== 3) return coords;

      const [x, y, r] = parts;
      const newRadius = Math.max(r!, minSize / 2);

      return `${x},${y},${newRadius}`;
    }
    default:
      return coords; // Complex polygons require manual adjustment
  }
}
