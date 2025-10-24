// ============================================================================
// RESUME COMPONENT INTERNATIONALIZATION
// ============================================================================

export type ResumeI18n = Readonly<Record<string, string>>;
export const RESUME_I18N = {
  // Content labels
  work: "Work",
  download: "Download CV",
  company: "Company",
  role: "Role",
  date: "Date",
} as const satisfies ResumeI18n;
