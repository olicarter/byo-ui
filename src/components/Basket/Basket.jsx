import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';

import { useAuth } from '../../contexts';
import { sumOrderItems } from '../../helpers';
import { GET_USER, SUBMIT_ORDER } from './Basket.gql';
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
  const { push } = useHistory();
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const [
    getUser,
    { data: { allUsers } = {}, loading: getUserLoading },
  ] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { id: unsubmittedOrderId, deliverySlot, orderItems = [] } =
    orders.find(({ submitted }) => !submitted) || {};

  const [submitOrder, { loading: submitOrderLoading }] = useMutation(
    SUBMIT_ORDER,
    {
      variables: { id: unsubmittedOrderId, submitted: true },
      onCompleted: () => push('/account'),
    },
  );

  let { products, containers, total } = sumOrderItems(orderItems);
  const productsTotal = +parseFloat(products).toFixed(2);
  const containersTotal = +parseFloat(containers).toFixed(2);
  total = +parseFloat(total).toFixed(2);

  const orderItemProducts = uniqWith(
    orderItems,
    (a, b) => a.productVariant.product.id === b.productVariant.product.id,
  );

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
              ? `Minimum order value is £${minOrderValue}`
              : undefined
          }
        >
          <Button
            borderRadius
            disabled={total < minOrderValue || !deliverySlot}
            // loading={getUserLoading || submitOrderLoading}
            onClick={submitOrder}
          >
            Place order
          </Button>
        </FormGroup>
      </Column>
    </Columns>
  );
};
