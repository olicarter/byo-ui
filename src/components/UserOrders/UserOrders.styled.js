import styled from 'styled-components';
import { transparentize } from 'polished';

export const CardContent = styled.div(({ theme: { palette: { black } } }) => ({
  color: black,
  cursor: 'default',
}));

export const Section = styled.section(() => ({
  ':not(:first-of-type)': {
    marginTop: '1rem',
  },
}));

export const Row = styled.div(({ bold }) => ({
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1rem',
  fontWeight: bold ? 700 : 'normal',
  justifyContent: 'space-between',
  width: '100%',
}));

export const Header = styled(Row)(() => ({
  fontSize: '1.4rem',
  fontWeight: 600,
}));

export const OrderId = styled.span(() => ({
  textTransform: 'uppercase',
}));

export const OrderItemHeader = styled(Row)(() => ({
  fontWeight: 700,
}));

export const Status = styled.span(
  ({
    textAlign = 'left',
    theme: {
      palette: { primary },
    },
  }) => ({
    color: primary,
    fontWeight: 600,
    textAlign,
  }),
);

export const Name = styled.span(() => ({
  height: '16px',
  lineHeight: '18px',
  width: '1000px',
}));

export const Quantity = styled.span(() => ({
  width: '162px',
  height: '13px',
  lineHeight: '13px',
}));

export const GreySpan = styled.span(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.5, black),
}));
