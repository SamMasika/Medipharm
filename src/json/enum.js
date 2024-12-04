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
