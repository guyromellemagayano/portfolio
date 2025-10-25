// ============================================================================
// FORM COMPONENT INTERNATIONALIZATION
// ============================================================================

export type FormI18n = Readonly<Record<string, string>>;
export const FORM_I18N = {
  newsletterFormHeading: "Stay up to date",
  newsletterFormDescription:
    "Get notified when I publish something new, and unsubscribe at any time.",
  newsletterFormEmailAddressLabel: "Email address",
  newsletterFormJoinButtonTextLabel: "Join",
} as const satisfies FormI18n;
