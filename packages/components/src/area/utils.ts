import type { AreaShape, CircleCoords, PolyCoords, RectCoords } from "./index";

/** Validates rectangular coordinates format: x1,y1,x2,y2 */
const validateRectCoords = (coords: string): boolean => {
  const parts = coords.split(",").map(Number);
  if (parts.length !== 4) return false;
  const [x1, y1, x2, y2] = parts;
  return x2! > x1! && y2! > y1! && parts.every((n) => !isNaN(n) && n >= 0);
};

/** Validates circular coordinates format: x,y,radius */
const validateCircleCoords = (coords: string): boolean => {
  const parts = coords.split(",").map(Number);
  if (parts.length !== 3) return false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_x, _y, r] = parts;
  return r! > 0 && parts.every((n) => !isNaN(n) && n >= 0);
};

/** Validates polygon coordinates format: x1,y1,x2,y2,... (minimum 3 points) */
const validatePolyCoords = (coords: string): boolean => {
  const parts = coords.split(",").map(Number);
  return (
    parts.length >= 6 &&
    parts.length % 2 === 0 &&
    parts.every((n) => !isNaN(n) && n >= 0)
  );
};

/** Validates coordinates based on shape type */
const validateCoordinates = (shape: AreaShape, coords?: string): boolean => {
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
};

/** Calculates area size in pixels² for analytics and touch optimization */
const calculateAreaSize = (shape: AreaShape, coords?: string): number => {
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
      // Shoelace formula for polygon area
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
};

/** Calculates geometric center point for analytics */
const calculateCenterPoint = (
  shape: AreaShape,
  coords?: string
): { x: number; y: number } | undefined => {
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
      let _x = 0,
        _y = 0;
      for (let i = 0; i < points.length; i += 2) {
        _x += points[i]!;
        _y += points[i + 1]!;
      }
      return { x: _x / (points.length / 2), y: _y / (points.length / 2) };
    }
    default:
      return undefined;
  }
};

/** Checks if area meets minimum touch target requirements (44px recommended) */
const checkTouchOptimization = (
  shape: AreaShape,
  coords?: string,
  minSize = 44
): boolean => {
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
};

/** Utility functions for area coordinate manipulation and validation */
export const AreaUtils = {
  // Core validation and calculation functions
  validateCoordinates,
  calculateAreaSize,
  calculateCenterPoint,
  checkTouchOptimization,

  /** Creates rectangular coordinates string */
  createRectCoords: (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): RectCoords => `${x1},${y1},${x2},${y2}`,

  /** Creates circular coordinates string */
  createCircleCoords: (x: number, y: number, r: number): CircleCoords =>
    `${x},${y},${r}`,

  /** Creates polygon coordinates string from point array */
  createPolyCoords: (points: Array<{ x: number; y: number }>): PolyCoords =>
    points.map((p) => `${p.x},${p.y}`).join(","),

  /** Converts percentage coordinates to absolute pixels */
  percentToAbsolute: (
    coords: string,
    imageWidth: number,
    imageHeight: number
  ): string => {
    return coords
      .split(",")
      .map((coord, index) => {
        const isEven = index % 2 === 0;
        const dimension = isEven ? imageWidth : imageHeight;
        return Math.round((parseFloat(coord) / 100) * dimension);
      })
      .join(",");
  },

  /** Expands area to meet minimum touch target size */
  expandForTouch: (shape: AreaShape, coords: string, minSize = 44): string => {
    if (shape === "rect") {
      const [x1, y1, x2, y2] = coords.split(",").map(Number);
      const width = x2! - x1!;
      const height = y2! - y1!;

      if (width < minSize || height < minSize) {
        const centerX = (x1! + x2!) / 2;
        const centerY = (y1! + y2!) / 2;
        const newHalfWidth = Math.max(width, minSize) / 2;
        const newHalfHeight = Math.max(height, minSize) / 2;

        return `${centerX - newHalfWidth},${centerY - newHalfHeight},${centerX + newHalfWidth},${centerY + newHalfHeight}`;
      }
    }

    return coords;
  },
};
