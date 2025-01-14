export type Bank = {
  title: string;
  slug: string;
  outcomes: Array<Outcome>;
};
export type Outcome = {
  title: string;
  slug: string;
  exercises: Array<Exercise>;
};
export type Exercise = {
  seed: number;
  qti: string;
  pretext: string;
  tex: string;
  html: string;
  params: any;
};
export type Params = {
  bankSlug: string;
  outcomeSlug: string;
  exerciseVersion: string;
};
export type OutcomeRef = {
  bankSlug: string;
  outcomeSlug: string;
};
export type Assessment = {
  exercises: Exercise[];
  tex: string;
};
