export const statusReasons = {
  GoodStanding: 'Good Standing',
  UnderDiscipline: 'Under Discipline',
  Former: 'Former',
  Honorary: 'Honorary',
  Deceased: 'Deceased'
};

export const statusReasonsOptions = Object.keys(statusReasons).map((key) => ({
  text: statusReasons[key],  // Display text
  value: key                  // Corresponding value
}));
export const churchProgramCategories = {
  WorshipServices: 'Worship Services',
  SpiritualGrowth: 'Spiritual Growth & Prayer',
  MusicRehearsals: 'Music & Worship Rehearsals',
  Fellowship: 'Fellowship & Community',
  SpecialPrograms: 'Special Programs',
};

export const churchProgramCategoriesOptions = Object.keys(churchProgramCategories).map((key) => ({
  text: churchProgramCategories[key], // Display text
  value: key                          // Corresponding value
}));
