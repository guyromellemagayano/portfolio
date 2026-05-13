/**
 * @file apps/web/src/data/services.ts
 * @author Guy Romelle Magayano
 * @description Service offering data stored as JSON with typed runtime parsing.
 */

import rawServicesDataJson from "@web/data/services.json";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectEnum,
  expectOptionalBoolean,
  expectOptionalString,
  expectPathname,
  expectRecord,
  expectString,
  expectStringArray,
} from "@web/lib/json-data";

const LINK_TARGETS = ["_blank", "_self"] as const;

type BookingTarget = (typeof LINK_TARGETS)[number];

export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  outcomes: string[];
  process: string[];
  icon: string;
  price: string;
  priceNote?: string;
  bestFor: string;
  cta: string;
  href: string;
  featured?: boolean;
}

export interface CapabilityCluster {
  id: string;
  title: string;
  items: string[];
}

export interface BookingPath {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  target?: BookingTarget;
}

type ServicesData = {
  services: Service[];
  capabilityClusters: CapabilityCluster[];
  bookingPaths: BookingPath[];
};

const SERVICES_DATA_KEYS = [
  "services",
  "capabilityClusters",
  "bookingPaths",
] as const;
const SERVICE_KEYS = [
  "id",
  "title",
  "description",
  "bullets",
  "outcomes",
  "process",
  "icon",
  "price",
  "priceNote",
  "bestFor",
  "cta",
  "href",
  "featured",
] as const;
const CAPABILITY_CLUSTER_KEYS = ["id", "title", "items"] as const;
const BOOKING_PATH_KEYS = [
  "id",
  "title",
  "description",
  "cta",
  "href",
  "target",
] as const;

function parseService(value: unknown, path: string): Service {
  const record = expectRecord(value, path);

  assertExactKeys(record, SERVICE_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    description: expectString(record.description, `${path}.description`),
    bullets: expectStringArray(record.bullets, `${path}.bullets`),
    outcomes: expectStringArray(record.outcomes, `${path}.outcomes`),
    process: expectStringArray(record.process, `${path}.process`),
    icon: expectString(record.icon, `${path}.icon`),
    price: expectString(record.price, `${path}.price`),
    priceNote: expectOptionalString(record.priceNote, `${path}.priceNote`),
    bestFor: expectString(record.bestFor, `${path}.bestFor`),
    cta: expectString(record.cta, `${path}.cta`),
    href: expectPathname(record.href, `${path}.href`),
    featured: expectOptionalBoolean(record.featured, `${path}.featured`),
  };
}

function parseCapabilityCluster(
  value: unknown,
  path: string
): CapabilityCluster {
  const record = expectRecord(value, path);

  assertExactKeys(record, CAPABILITY_CLUSTER_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    items: expectStringArray(record.items, `${path}.items`),
  };
}

function parseBookingPath(value: unknown, path: string): BookingPath {
  const record = expectRecord(value, path);

  assertExactKeys(record, BOOKING_PATH_KEYS, path);

  return {
    id: expectString(record.id, `${path}.id`),
    title: expectString(record.title, `${path}.title`),
    description: expectString(record.description, `${path}.description`),
    cta: expectString(record.cta, `${path}.cta`),
    href: expectPathname(record.href, `${path}.href`),
    target:
      typeof record.target === "undefined"
        ? undefined
        : expectEnum(record.target, LINK_TARGETS, `${path}.target`),
  };
}

function createServicesData(value: unknown): ServicesData {
  const path = "data/services.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, SERVICES_DATA_KEYS, path);

  const services = expectArray(record.services, `${path}.services`).map(
    (entry, index) => parseService(entry, `${path}.services[${index}]`)
  );
  const capabilityClusters = expectArray(
    record.capabilityClusters,
    `${path}.capabilityClusters`
  ).map((entry, index) =>
    parseCapabilityCluster(entry, `${path}.capabilityClusters[${index}]`)
  );
  const bookingPaths = expectArray(
    record.bookingPaths,
    `${path}.bookingPaths`
  ).map((entry, index) =>
    parseBookingPath(entry, `${path}.bookingPaths[${index}]`)
  );

  assertUniqueValues(
    services.map((service) => service.id),
    "service id",
    `${path}.services`
  );
  assertUniqueValues(
    capabilityClusters.map((cluster) => cluster.id),
    "capability cluster id",
    `${path}.capabilityClusters`
  );
  assertUniqueValues(
    bookingPaths.map((bookingPath) => bookingPath.id),
    "booking path id",
    `${path}.bookingPaths`
  );

  return {
    services,
    capabilityClusters,
    bookingPaths,
  };
}

const servicesData = createServicesData(rawServicesDataJson as unknown);

export const services: Service[] = servicesData.services;
export const capabilityClusters: CapabilityCluster[] =
  servicesData.capabilityClusters;
export const bookingPaths: BookingPath[] = servicesData.bookingPaths;
