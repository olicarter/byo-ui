import React from 'react';
import { useHistory } from 'react-router-dom';

import { FloatingButton } from '@components/FloatingButton';

export const HomePage = () => {
  const { push } = useHistory();

  return (
    <FloatingButton onClick={() => push('/products?category=baking')}>
      Go to shop
    </FloatingButton>
  );
};
