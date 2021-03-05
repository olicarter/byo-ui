import React from 'react';
import { useHistory } from 'react-router-dom';

import { CallToActionButton } from '@components/CallToActionButton';

export const HomePage = () => {
  const { push } = useHistory();

  return (
    <CallToActionButton onClick={() => push('/products?category=baking')}>
      Go to shop
    </CallToActionButton>
  );
};
