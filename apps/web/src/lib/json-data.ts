/**
 * @file apps/web/src/lib/json-data.ts
 * @author Guy Romelle Magayano
 * @description Shared validation helpers for local JSON-backed content records.
 */

type JsonRecord = Record<string, unknown>;

type ExpectStringOptions = {
  allowEmpty?: boolean;
};

function describeValueType(value: unknown): string {
  if (Array.isArray(value)) {
    return "array";
  }

  if (value === null) {
    return "null";
  }

  return typeof value;
}

function fail(path: string, message: string): never {
  throw new Error(`Invalid local data at "${path}": ${message}.`);
}

/** Ensures a record does not contain unexpected keys. */
export function assertExactKeys(
  record: JsonRecord,
  allowedKeys: readonly string[],
  path: string
): void {
  const invalidKey = Object.keys(record).find(
    (key) => !allowedKeys.includes(key)
  );

  if (invalidKey) {
    fail(`${path}.${invalidKey}`, "unexpected field");
  }
}

/** Ensures an ordered string collection does not contain duplicates. */
export function assertUniqueValues(
  values: readonly string[],
  label: string,
  path: string
): void {
  const seen = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      fail(path, `duplicate ${label} "${value}"`);
    }

    seen.add(value);
  }
}

/** Ensures a value is an array. */
export function expectArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    fail(path, `expected array, received ${describeValueType(value)}`);
  }

  return value;
}

/** Ensures a value is a boolean. */
export function expectBoolean(value: unknown, path: string): boolean {
  if (typeof value !== "boolean") {
    fail(path, `expected boolean, received ${describeValueType(value)}`);
  }

  return value;
}

/** Ensures a value is an ISO `YYYY-MM-DD` date string. */
export function expectDateString(value: unknown, path: string): string {
  const normalizedValue = expectString(value, path);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    fail(path, 'expected ISO date string in "YYYY-MM-DD" format');
  }

  const normalizedDate = new Date(`${normalizedValue}T00:00:00.000Z`);

  if (
    Number.isNaN(normalizedDate.getTime()) ||
    normalizedDate.toISOString().slice(0, 10) !== normalizedValue
  ) {
    fail(path, "expected a valid calendar date");
  }

  return normalizedValue;
}

/** Ensures a value is an ISO date-time string. */
export function expectDateTimeString(value: unknown, path: string): string {
  const normalizedValue = expectString(value, path);
  const normalizedDate = new Date(normalizedValue);

  if (
    Number.isNaN(normalizedDate.getTime()) ||
    normalizedDate.toISOString() !== normalizedValue
  ) {
    fail(path, "expected ISO date-time string");
  }

  return normalizedValue;
}

/** Ensures a value matches one of the allowed string literals. */
export function expectEnum<const T extends readonly string[]>(
  value: unknown,
  allowedValues: T,
  path: string
): T[number] {
  const normalizedValue = expectString(value, path);

  if (!allowedValues.includes(normalizedValue)) {
    fail(
      path,
      `expected one of ${allowedValues.map((entry) => `"${entry}"`).join(", ")}`
    );
  }

  return normalizedValue as T[number];
}

/** Ensures a value is a safe non-empty href string. */
export function expectHref(value: unknown, path: string): string {
  const normalizedValue = expectString(value, path);
  const loweredValue = normalizedValue.toLowerCase();

  if (
    loweredValue.startsWith("javascript:") ||
    loweredValue.startsWith("data:")
  ) {
    fail(path, "disallowed URL protocol");
  }

  return normalizedValue;
}

/** Ensures a value is an internal route path. */
export function expectPathname(value: unknown, path: string): string {
  const normalizedValue = expectString(value, path);

  if (!normalizedValue.startsWith("/")) {
    fail(path, 'expected path to start with "/"');
  }

  return normalizedValue;
}

/** Ensures a value is a boolean when present. */
export function expectOptionalBoolean(
  value: unknown,
  path: string
): boolean | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  return expectBoolean(value, path);
}

/** Ensures a value is an ISO date string when present. */
export function expectOptionalDateString(
  value: unknown,
  path: string
): string | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  return expectDateString(value, path);
}

/** Ensures a value is an ISO date-time string when present. */
export function expectOptionalDateTimeString(
  value: unknown,
  path: string
): string | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  return expectDateTimeString(value, path);
}

/** Ensures a value is a positive finite number when present. */
export function expectOptionalPositiveNumber(
  value: unknown,
  path: string
): number | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    fail(
      path,
      `expected positive number, received ${describeValueType(value)}`
    );
  }

  return value;
}

/** Ensures a value is a trimmed string when present. */
export function expectOptionalString(
  value: unknown,
  path: string
): string | undefined {
  if (typeof value === "undefined") {
    return undefined;
  }

  if (typeof value !== "string") {
    fail(path, `expected string, received ${describeValueType(value)}`);
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : undefined;
}

/** Ensures a value is a plain object. */
export function expectRecord(value: unknown, path: string): JsonRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(path, `expected object, received ${describeValueType(value)}`);
  }

  return value as JsonRecord;
}

/** Ensures a value is a string. */
export function expectString(
  value: unknown,
  path: string,
  options: ExpectStringOptions = {}
): string {
  if (typeof value !== "string") {
    fail(path, `expected string, received ${describeValueType(value)}`);
  }

  const normalizedValue = value.trim();

  if (!options.allowEmpty && normalizedValue.length === 0) {
    fail(path, "expected non-empty string");
  }

  return normalizedValue;
}

/** Ensures a value is an array of strings. */
export function expectStringArray(value: unknown, path: string): string[] {
  return expectArray(value, path).map((entry, index) =>
    expectString(entry, `${path}[${index}]`)
  );
}
