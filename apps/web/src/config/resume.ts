/**
 * @file apps/web/src/config/resume.ts
 * @author Guy Romelle Magayano
 * @description Static configuration for resume content and settings.
 */

import { type ImageProps } from "next/image";

import resumeConfig from "@web/data/resume.json";
import logoAirbnb from "@web/images/logos/airbnb.svg";
import logoFacebook from "@web/images/logos/facebook.svg";
import logoPlanetaria from "@web/images/logos/planetaria.svg";
import logoStarbucks from "@web/images/logos/starbucks.svg";

// ============================================================================
// RESUME CONFIG TYPES
// ============================================================================

export type ResumeLogoKey = "planetaria" | "airbnb" | "facebook" | "starbucks";

export type ResumeRoleDate = string | { label: string; dateTime: string };

export type ResumeRole = Readonly<{
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: ResumeRoleDate;
  end: ResumeRoleDate;
}>;

type ResumeRoleConfig = Readonly<{
  company: string;
  title: string;
  logoKey: ResumeLogoKey;
  start: ResumeRoleDate;
  end: ResumeRoleDate;
}>;

type ResumeConfigData = Readonly<{
  resumeFileName: string;
  roles: ReadonlyArray<ResumeRoleConfig>;
}>;

// ============================================================================
// RESUME CONFIG DATA
// ============================================================================

const RESUME_LOGO_KEYS: ReadonlyArray<ResumeLogoKey> = [
  "planetaria",
  "airbnb",
  "facebook",
  "starbucks",
];

const RESUME_LOGO_MAP: Record<ResumeLogoKey, ImageProps["src"]> = {
  planetaria: logoPlanetaria,
  airbnb: logoAirbnb,
  facebook: logoFacebook,
  starbucks: logoStarbucks,
};

const isResumeLogoKey = (value: string): value is ResumeLogoKey =>
  RESUME_LOGO_KEYS.includes(value as ResumeLogoKey);

const isResumeRoleDate = (value: unknown): value is ResumeRoleDate => {
  if (typeof value === "string") return true;

  if (!value || typeof value !== "object") return false;

  return (
    "label" in value &&
    "dateTime" in value &&
    typeof (value as { label: unknown }).label === "string" &&
    typeof (value as { dateTime: unknown }).dateTime === "string"
  );
};

const normalizeRoleDate = (value: ResumeRoleDate): ResumeRoleDate => {
  if (typeof value === "string") return value;

  const normalizedDateTime =
    value.dateTime === "present"
      ? new Date().getFullYear().toString()
      : value.dateTime;

  return {
    label: value.label,
    dateTime: normalizedDateTime,
  };
};

const createResumeConfigData = (): ResumeConfigData => {
  const resumeFileName =
    typeof resumeConfig.resumeFileName === "string" &&
    resumeConfig.resumeFileName.trim().length > 0
      ? resumeConfig.resumeFileName
      : "/resume.pdf";

  const roles: ReadonlyArray<ResumeRoleConfig> = resumeConfig.roles.map(
    (role) => {
      if (
        typeof role.company !== "string" ||
        role.company.trim().length === 0
      ) {
        throw new Error("Invalid resume company value.");
      }

      if (typeof role.title !== "string" || role.title.trim().length === 0) {
        throw new Error("Invalid resume title value.");
      }

      if (!isResumeLogoKey(role.logoKey)) {
        throw new Error(`Invalid resume logoKey: ${role.logoKey}`);
      }

      if (!isResumeRoleDate(role.start) || !isResumeRoleDate(role.end)) {
        throw new Error(`Invalid resume role date for ${role.company}.`);
      }

      return {
        company: role.company,
        title: role.title,
        logoKey: role.logoKey,
        start: normalizeRoleDate(role.start),
        end: normalizeRoleDate(role.end),
      };
    }
  );

  return { resumeFileName, roles };
};

const RESUME_CONFIG_DATA = createResumeConfigData();

// ============================================================================
// RESUME EXPORTS
// ============================================================================

export const RESUME_FILE_NAME: string = RESUME_CONFIG_DATA.resumeFileName;

export const RESUME_ROLE_DATA: ReadonlyArray<ResumeRole> =
  RESUME_CONFIG_DATA.roles.map((role) => ({
    company: role.company,
    title: role.title,
    logo: RESUME_LOGO_MAP[role.logoKey],
    start: role.start,
    end: role.end,
  }));
