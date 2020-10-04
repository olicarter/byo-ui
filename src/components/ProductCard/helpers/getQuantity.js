export const getQuantity = ({ orderItems = [], units }) => {
  const allItems = orderItems.every(
    ({ productVariant: { container } }) => !!container,
  );
  // const isItem = unit.singular === 'item';

  // const quantityNeedsDividing = !isItem && quantity * increment >= 1000;
  // const computedQuantity = quantityNeedsDividing
  //   ? (quantity * increment) / 1000
  //   : quantity * increment;
  // let computedUnit = {};

  // if (quantityNeedsDividing) {
  //   if (unit.singular === 'gram')
  //     computedUnit =
  //       units.find(({ singular }) => singular === 'kilogram') || {};
  //   if (unit.singular === 'millilitre')
  //     computedUnit = units.find(({ singular }) => singular === 'litre') || {};
  // } else {
  //   computedUnit = unit;
  // }

  // return `${computedQuantity}${isItem ? ' ' : ''}${
  //   computedUnit[
  //     computedQuantity === 1 ? 'singularAbbreviated' : 'pluralAbbreviated'
  //   ]
  // }`;
};
