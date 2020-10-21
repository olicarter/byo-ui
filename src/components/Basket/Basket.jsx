import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';

import { useAuth } from '../../contexts';
import { sumOrderItems } from '../../helpers';
import {
  GET_SETTINGS,
  GET_USERS_BY_NETLIFY_ID,
  SUBMIT_ORDER,
} from './Basket.gql';
import { Button } from '../Button';
import { Column } from '../Column';
import { Columns } from '../Columns';
import { DeliverySlotPicker } from '../DeliverySlotPicker';
import { FormGroup } from '../FormGroup';
import { Grid } from '../Grid';
import { Label } from '../Label';
import { ProductCard } from '../ProductCard';
import { Section } from '../Section';

export const Basket = () => {
  const { push } = useHistory();
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const {
    data: {
      allSettings: [
        { chooseDeliverySlotInfo, minOrderValue, orderSubmissionInfo } = {},
      ] = [],
    } = {},
  } = useQuery(GET_SETTINGS);

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { netlifyId },
    },
  );

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { id: unsubmittedOrderId, deliverySlot, orderItems = [] } =
    orders.find(({ submitted }) => !submitted) || {};

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    variables: { id: unsubmittedOrderId, submitted: true },
    onCompleted: () => push('/account'),
  });

  let { products, containers, total } = sumOrderItems(orderItems);
  const productsTotal = products.toFixed(2);
  const containersTotal = containers.toFixed(2);
  total = total.toFixed(2);

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
        <FormGroup label="Choose a delivery slot" info={chooseDeliverySlotInfo}>
          <DeliverySlotPicker />
        </FormGroup>

        <FormGroup>
          {productsTotal ? (
            <div>
              <Label color="grey">£{productsTotal} goods</Label>
            </div>
          ) : null}
          {containersTotal ? (
            <div>
              <Label color="grey">
                £{containersTotal} refundable containers
              </Label>
            </div>
          ) : null}
          <FormGroup
            label={`£${total} total`}
            info={total >= minOrderValue ? orderSubmissionInfo : undefined}
            errorInfo={
              productsTotal && containersTotal && total < minOrderValue
                ? `Minimum order value is £${minOrderValue}`
                : undefined
            }
            margin="0"
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
        </FormGroup>
      </Column>
    </Columns>
  );
};
