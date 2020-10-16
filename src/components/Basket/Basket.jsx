import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';

import { useAuth } from '../../contexts';
import { sumOrderItems } from '../../helpers';
import { GET_ORDER_ITEMS } from './Basket.gql';
import { Button } from '../Button';
import { Column } from '../Column';
import { Columns } from '../Columns';
import { DeliverySlotPicker } from '../DeliverySlotPicker';
import { FormGroup } from '../FormGroup';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';
import { Section } from '../Section';

/** @todo get this from backend settings doc */
const minOrderValue = 15;

export const Basket = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const [
    getUserOrders,
    { data: { allUsers } = {}, loading: getOrderItemsLoading },
  ] = useLazyQuery(GET_ORDER_ITEMS, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUserOrders();
  }, [netlifyId, getUserOrders]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { deliverySlot, orderItems = [] } =
    orders.find(({ paid }) => !paid) || {};

  let { products, containers, total } = sumOrderItems(orderItems);
  const productsTotal = +parseFloat(products).toFixed(2);
  const containersTotal = +parseFloat(containers).toFixed(2);
  total = +parseFloat(total).toFixed(2);

  const orderItemProducts = uniqWith(
    orderItems,
    (a, b) => a.productVariant.product.id === b.productVariant.product.id,
  );

  /** @todo implement this */
  const placeOrder = () => {};

  return (
    <Columns>
      <Column flex={2}>
        <Section>
          <Grid>
            {orderItemProducts.map(
              ({ id, productVariant: { product } = {} }) => (
                <ProductCard key={id} product={product} />
              ),
            )}
          </Grid>
        </Section>
      </Column>

      <Column flex={1}>
        <FormGroup
          label="Choose a delivery slot"
          info="The delivery rider will contact you with a more precise time on day of delivery."
        >
          <DeliverySlotPicker />
        </FormGroup>

        <FormGroup
          label={`Total${productsTotal ? ` £${productsTotal}` : ''}${
            containersTotal ? ` + £${containersTotal}` : ''
          }`}
          info={
            total >= minOrderValue
              ? 'Payment is taken by the rider on delivery. Price is dependant on stock levels on day of dispatch.'
              : undefined
          }
          errorInfo={
            productsTotal && containersTotal && total < minOrderValue
              ? `£${minOrderValue} minimum order value`
              : undefined
          }
        >
          <Button
            borderRadius
            disabled={total < minOrderValue || !deliverySlot}
            loading={getOrderItemsLoading}
            onClick={placeOrder}
          >
            Place order
          </Button>
        </FormGroup>
      </Column>
    </Columns>
  );
};
