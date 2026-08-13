export const RECRUITMENT_COUNTRIES = [
  { key: "sriLanka", code: "LK", region: "southAsia" },
  { key: "ethiopia", code: "ET", region: "eastAfrica" },
  { key: "kenya", code: "KE", region: "eastAfrica" },
  { key: "bangladesh", code: "BD", region: "southAsia" },
  { key: "philippines", code: "PH", region: "southeastAsia" },
  { key: "pakistan", code: "PK", region: "southAsia" },
] as const;

export type RecruitmentCountryKey = (typeof RECRUITMENT_COUNTRIES)[number]["key"];
export type RecruitmentCountryRegion =
  (typeof RECRUITMENT_COUNTRIES)[number]["region"];
