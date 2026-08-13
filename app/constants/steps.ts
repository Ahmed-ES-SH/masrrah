type RecruitmentStepKey =
  | "cvSelection"
  | "fees"
  | "procedures"
  | "arrival"
  | "handover"
  | "warranty";

export const RECRUITMENT_STEPS: readonly {
  key: RecruitmentStepKey;
  image: string;
}[] = [
  {
    key: "cvSelection",
    image: "/steps-recruitment-process/cv-selection-icon.png",
  },
  {
    key: "fees",
    image: "/steps-recruitment-process/mony-icon.png",
  },
  {
    key: "procedures",
    image: "/steps-recruitment-process/Recruitment-procedures-icon.png",
  },
  {
    key: "arrival",
    image: "/steps-recruitment-process/Arrival-of-workers-icon.png",
  },
  {
    key: "handover",
    image: "/steps-recruitment-process/Receiving-the-workforce-icon.png",
  },
  {
    key: "warranty",
    image: "/steps-recruitment-process/3-month-warranty-icon.png",
  },
];
