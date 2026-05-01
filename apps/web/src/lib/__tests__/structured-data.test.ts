/**
 * @file apps/web/src/lib/__tests__/structured-data.test.ts
 * @author Guy Romelle Magayano
 * @description Unit tests for portfolio JSON-LD builders.
 */

import { describe, expect, it } from "vitest";

import { services } from "@web/data/services";
import { getPage } from "@web/data/site";
import {
  buildBreadcrumbListStructuredData,
  buildContactPageStructuredData,
  buildPersonStructuredData,
  buildProfessionalServiceStructuredData,
} from "@web/lib/structured-data";

describe("structured data builders", () => {
  it("builds breadcrumb lists with absolute item URLs", () => {
    const structuredData = buildBreadcrumbListStructuredData([
      { name: "Home", path: "/" },
      { name: "Capabilities", path: "/capabilities" },
    ]);

    expect(structuredData).toMatchObject({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.guyromellemagayano.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Capabilities",
          item: "https://www.guyromellemagayano.com/capabilities",
        },
      ],
    });
  });

  it("anchors professional service offers to the capabilities page", () => {
    const structuredData = buildProfessionalServiceStructuredData(
      getPage("capabilities"),
      services
    );

    expect(structuredData).toMatchObject({
      "@type": "ProfessionalService",
      "@id":
        "https://www.guyromellemagayano.com/capabilities#professional-service",
      url: "https://www.guyromellemagayano.com/capabilities",
      hasOfferCatalog: expect.objectContaining({
        itemListElement: expect.arrayContaining([
          expect.objectContaining({
            "@id":
              "https://www.guyromellemagayano.com/capabilities#offer-architecture-review",
            url: "https://www.guyromellemagayano.com/capabilities#architecture-review",
            itemOffered: expect.objectContaining({
              "@type": "Service",
              "@id":
                "https://www.guyromellemagayano.com/capabilities#service-architecture-review",
            }),
          }),
        ]),
      }),
    });
  });

  it("builds contact page metadata without mailto-prefixed schema email", () => {
    const structuredData = buildContactPageStructuredData(getPage("contact"));

    expect(structuredData).toMatchObject({
      "@type": "ContactPage",
      url: "https://www.guyromellemagayano.com/contact",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Client inquiries",
        email: "aspiredtechie2010@gmail.com",
      },
    });
  });

  it("identifies Guy Romelle Magayano as the service provider", () => {
    const structuredData = buildPersonStructuredData();

    expect(structuredData).toMatchObject({
      "@type": "Person",
      name: "Guy Romelle Magayano",
      email: "aspiredtechie2010@gmail.com",
      makesOffer: {
        "@type": "OfferCatalog",
        url: "https://www.guyromellemagayano.com/capabilities",
      },
    });
  });
});
