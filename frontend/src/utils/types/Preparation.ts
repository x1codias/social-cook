export type PreparationStep = {
  photo?: string;
  description: string;
};

export type Preparation = {
  video?: string;
  steps: PreparationStep[];
};
