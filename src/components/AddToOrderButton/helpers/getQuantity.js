export const getQuantity = ({ increments, quantity, unit, units = [] }) => {
  const isItem = unit.singular === 'item';
  const quantityNeedsDividing = !isItem && quantity * increments >= 1000;
  const computedQuantity = quantityNeedsDividing
    ? (quantity * increments) / 1000
    : quantity * increments;
  let computedUnit = {};

  if (quantityNeedsDividing) {
    if (unit.singular === 'gram')
      computedUnit =
        units.find(({ singular }) => singular === 'kilogram') || {};
    if (unit.singular === 'millilitre')
      computedUnit = units.find(({ singular }) => singular === 'litre') || {};
  } else {
    computedUnit = unit;
  }

  return `${computedQuantity}${isItem ? ' ' : ''}${
    computedUnit[
      computedQuantity === 1 ? 'singularAbbreviated' : 'pluralAbbreviated'
    ]
  }`;
};
