// enum.js
export const SCATE = {
    Keyword: 'Keyword',
    Hashtag: 'Hashtag',
    Schedules: 'Schedules',
  };
  
  export const scatOptions = Object.keys(SCATE).map((key) => ({
    text: SCATE[key],
    value: SCATE[key],
  }));
  