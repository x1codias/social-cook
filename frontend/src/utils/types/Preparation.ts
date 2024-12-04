export type PreparationStep = {
  photo?: File;
  description: string;
};

export type Preparation = {
  prepVideo?: string;
  steps: PreparationStep[];
};
