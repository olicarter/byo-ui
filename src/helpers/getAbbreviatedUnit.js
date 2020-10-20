export const getAbbreviatedUnit = unit => {
  switch (unit) {
    case 'grams':
      return 'g';
    case 'kilograms':
      return 'kg';
    case 'millilitres':
      return 'ml';
    case 'litres':
      return 'L';
    case 'items':
      return 'items';
    // no default
  }
};
