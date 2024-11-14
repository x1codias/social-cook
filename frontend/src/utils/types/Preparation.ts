export type PreparationStep = {
  photo?: File;
  description: string;
};

export type Preparation = {
  video?: File;
  steps: PreparationStep[];
};
