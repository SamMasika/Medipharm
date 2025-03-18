export const profileType = {
  Admin: 'Admin',
  storeOwner: 'Store Owner',
};
export const profileTypeOptions = Object.keys(profileType).map((key) => ({
  text: profileType[key],  // Display text
  value: key                  // Corresponding value
}));

