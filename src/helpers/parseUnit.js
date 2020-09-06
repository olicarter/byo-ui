export const parseUnit = (unit = 'grams') => {
  switch (unit) {
    case 'grams': {
      return {
        abbreviated: 'g',
        singular: 'gram',
        plural: 'grams',
      };
    }
    case 'kilograms': {
      return {
        abbreviated: 'kg',
        singular: 'kilogram',
        plural: 'kilograms',
      };
    }
    case 'millilitres': {
      return {
        abbreviated: 'ml',
        singular: 'millilitre',
        plural: 'millilitres',
      };
    }
    case 'litres': {
      return {
        abbreviated: 'L',
        singular: 'litre',
        plural: 'litres',
      };
    }
    case 'items': {
      return {
        abbreviated: 'items',
        singular: 'item',
        plural: 'items',
      };
    }
    // no default
  }
};
