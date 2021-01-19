import React, { forwardRef } from 'react';

import * as Styled from './Select.styled';

export const Select = forwardRef(
  ({ children, loading, name, onChange, value }, ref) => {
    return (
      <Styled.SelectWrapper>
        {loading ? (
          <span>{loading}</span>
        ) : (
          <>
            <Styled.Select
              name={name}
              onChange={onChange}
              ref={ref}
              value={value}
            >
              {children}
            </Styled.Select>
          </>
        )}
      </Styled.SelectWrapper>
    );
  },
);
