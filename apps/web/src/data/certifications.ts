/**
 * @file apps/web/src/data/certifications.ts
 * @author Guy Romelle Magayano
 * @description Certification-style proof points parsed from local JSON records.
 */

import rawCertificationsDataJson from "@web/data/certifications.json";
import {
  assertExactKeys,
  expectArray,
  expectBoolean,
  expectEnum,
  expectRecord,
  expectString,
} from "@web/lib/json-data";

const CERTIFICATION_VARIANTS = ["yellow", "white"] as const;
const CERTIFICATION_CATEGORIES = [
  "architecture",
  "frontend",
  "platform",
] as const;

type CertificationVariant = (typeof CERTIFICATION_VARIANTS)[number];
type CertificationCategory = (typeof CERTIFICATION_CATEGORIES)[number];

export interface Certification {
  name: string;
  earned: boolean;
  variant: CertificationVariant;
  category: CertificationCategory;
}

type CertificationsData = {
  certifications: Certification[];
};

const CERTIFICATIONS_DATA_KEYS = ["certifications"] as const;
const CERTIFICATION_KEYS = ["name", "earned", "variant", "category"] as const;

function parseCertification(value: unknown, path: string): Certification {
  const record = expectRecord(value, path);

  assertExactKeys(record, CERTIFICATION_KEYS, path);

  return {
    name: expectString(record.name, `${path}.name`),
    earned: expectBoolean(record.earned, `${path}.earned`),
    variant: expectEnum(
      record.variant,
      CERTIFICATION_VARIANTS,
      `${path}.variant`
    ),
    category: expectEnum(
      record.category,
      CERTIFICATION_CATEGORIES,
      `${path}.category`
    ),
  };
}

function createCertificationsData(value: unknown): CertificationsData {
  const path = "data/certifications.json";
  const record = expectRecord(value, path);

  assertExactKeys(record, CERTIFICATIONS_DATA_KEYS, path);

  return {
    certifications: expectArray(
      record.certifications,
      `${path}.certifications`
    ).map((entry, index) =>
      parseCertification(entry, `${path}.certifications[${index}]`)
    ),
  };
}

const certificationsData = createCertificationsData(
  rawCertificationsDataJson as unknown
);

export const certifications: Certification[] =
  certificationsData.certifications;

export const earnedCertificationCount = certifications.filter(
  (certification) => certification.earned
).length;
export const totalCertificationCount = certifications.length;
