export const getUnsubmittedOrderFromUser = user => {
  const { orders = [] } = user || {};
  return orders.find(({ submitted }) => !submitted) || {};
};
