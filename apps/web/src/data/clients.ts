/**
 * @file apps/web/src/data/clients.ts
 * @author Guy Romelle Magayano
 * @description Client and work-history data parsed from local JSON records.
 */

import rawClientsDataJson from "@web/data/clients.json";
import {
  assertExactKeys,
  assertUniqueValues,
  expectArray,
  expectBoolean,
  expectDateString,
  expectHref,
  expectOptionalDateString,
  expectRecord,
  expectString,
} from "@web/lib/json-data";

export interface Client {
  name: string;
  url?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  summary: string;
}

type ClientsData = {
  clients: Client[];
  workExperience: WorkExperience[];
};

const CLIENTS_DATA_KEYS = ["clients", "workExperience"] as const;
const CLIENT_KEYS = ["name", "url"] as const;
const WORK_EXPERIENCE_KEYS = [
  "company",
  "role",
  "startDate",
  "endDate",
  "current",
  "summary",
] as const;

function parseClient(value: unknown, path: string): Client {
  const record = expectRecord(value, path);

  assertExactKeys(record, CLIENT_KEYS, path);

  return {
    name: expectString(record.name, `${path}.name`),
    url:
      typeof record.url === "undefined"
        ? undefined
        : expectHref(record.url, `${path}.url`),
  };
}

function parseWorkExperience(value: unknown, path: string): WorkExperience {
  const record = expectRecord(value, path);

  assertExactKeys(record, WORK_EXPERIENCE_KEYS, path);

  const startDate = expectDateString(record.startDate, `${path}.startDate`);
  const endDate = expectOptionalDateString(record.endDate, `${path}.endDate`);
  const current =
    typeof record.current === "undefined"
      ? undefined
      : expectBoolean(record.current, `${path}.current`);

  if (current === true && typeof endDate !== "undefined") {
    throw new Error(
      `Invalid local data at "${path}.endDate": current roles must not define an end date.`
    );
  }

  if (current !== true && typeof endDate === "undefined") {
    throw new Error(
      `Invalid local data at "${path}.endDate": non-current roles must define an end date.`
    );
  }

  if (typeof endDate !== "undefined" && startDate > endDate) {
    throw new Error(
      `Invalid local data at "${path}.endDate": end date must not be earlier than start date.`
    );
  }

  return {
    company: expectString(record.company, `${path}.company`),
    role: expectString(record.role, `${path}.role`),
    startDate,
    endDate,
    current,
    summary: expectString(record.summary, `${path}.summary`),
  };
}

function createClientsData(value: unknown): ClientsData {
  const path = "data/clients.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, CLIENTS_DATA_KEYS, path);

  const clients = expectArray(record.clients, `${path}.clients`).map(
    (entry, index) => parseClient(entry, `${path}.clients[${index}]`)
  );
  const workExperience = expectArray(
    record.workExperience,
    `${path}.workExperience`
  ).map((entry, index) =>
    parseWorkExperience(entry, `${path}.workExperience[${index}]`)
  );

  assertUniqueValues(
    clients.map((client) => client.name),
    "client name",
    `${path}.clients`
  );
  assertUniqueValues(
    workExperience.map((entry) => `${entry.company}::${entry.role}`),
    "work experience role",
    `${path}.workExperience`
  );

  return {
    clients,
    workExperience,
  };
}

const clientsData = createClientsData(rawClientsDataJson as unknown);

export const clients: Client[] = clientsData.clients;
export const workExperience: WorkExperience[] = clientsData.workExperience;
