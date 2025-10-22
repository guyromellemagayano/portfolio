import { type ImageProps } from "next/image";

import logoAirbnb from "@web/images/logos/airbnb.svg";
import logoFacebook from "@web/images/logos/facebook.svg";
import logoPlanetaria from "@web/images/logos/planetaria.svg";
import logoStarbucks from "@web/images/logos/starbucks.svg";

// ============================================================================
// RESUME COMPONENT DATA
// ============================================================================

export interface Role {
  company: string;
  title: string;
  logo: ImageProps["src"];
  start: string | { label: string; dateTime: string };
  end: string | { label: string; dateTime: string };
}
export interface ResumeData extends Array<Role> {}
export const RESUME_DATA: ResumeData = [
  {
    company: "Planetaria",
    title: "CEO",
    logo: logoPlanetaria,
    start: "2019",
    end: {
      label: "Present",
      dateTime: new Date().getFullYear().toString(),
    },
  },
  {
    company: "Airbnb",
    title: "Product Designer",
    logo: logoAirbnb,
    start: "2014",
    end: "2019",
  },
  {
    company: "Facebook",
    title: "iOS Software Engineer",
    logo: logoFacebook,
    start: "2011",
    end: "2014",
  },
  {
    company: "Starbucks",
    title: "Shift Supervisor",
    logo: logoStarbucks,
    start: "2008",
    end: "2011",
  },
];
