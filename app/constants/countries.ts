export const RECRUITMENT_COUNTRIES = [
  { key: "india", code: "IN", region: "southAsia" },
  { key: "egypt", code: "EG", region: "northAfrica" },
  { key: "pakistan", code: "PK", region: "southAsia" },
  { key: "bangladesh", code: "BD", region: "southAsia" },
  { key: "philippines", code: "PH", region: "southeastAsia" },
  { key: "indonesia", code: "ID", region: "southeastAsia" },
] as const;

export type RecruitmentCountryKey = (typeof RECRUITMENT_COUNTRIES)[number]["key"];
export type RecruitmentCountryRegion =
  (typeof RECRUITMENT_COUNTRIES)[number]["region"];
