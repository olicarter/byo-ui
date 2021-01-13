import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const Content = styled.div({
  cursor: 'default',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  paddingBottom: '0.5rem',
});

export const Header = styled.header({
  paddingTop: '0.5rem',
});

export const HeaderUpper = styled.div({
  alignItems: 'center',
  display: 'flex',
  lineHeight: '18px',
  justifyContent: 'space-between',
  width: '100%',
});

export const HeaderLower = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

export const Title = styled.div({
  flex: 1,
});

export const Brand = styled(RouterLink)(
  ({
    theme: {
      palette: { black, primary },
    },
  }) => ({
    color: transparentize(0.33, black),
    fontSize: '0.75rem',
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: primary,
      },
    },
  }),
);

export const Border = styled.div(({ theme: { palette: { black } } }) => ({
  backgroundColor: transparentize(0.5, black),
  height: '3px',
  width: '100%',
}));

export const ImageWrapper = styled.div({
  height: 0,
  overflow: 'hidden',
  paddingTop: '61.804%',
  position: 'relative',
  width: '100%',
});

export const Image = styled.img({
  borderRadius: '0.5rem',
  height: '100%',
  left: 0,
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  width: '100%',
});

export const Name = styled(RouterLink)(
  ({
    theme: {
      palette: { black, focus },
    },
    to,
  }) => ({
    color: black,
    cursor: to ? 'pointer' : 'default',
    flex: 1,
    fontSize: '1.15rem',
    fontWeight: 700,
    lineHeight: '24px',
    margin: 0,
    outline: 'none',
    padding: 0,
    textDecoration: 'none',
    textTransform: 'capitalize',
    ':focus': {
      ...(to ? { color: focus } : {}),
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        ...(to ? { color: focus } : {}),
      },
    },
  }),
);

export const ProductVariants = styled.div(
  ({
    theme: {
      palette: { black },
    },
  }) => ({
    minHeight: '2px',
    position: 'relative',
    width: '100%',
    ':before': {
      backgroundColor: transparentize(0.9, black),
      content: '""',
      height: '2px',
      position: 'absolute',
      width: '100%',
    },
  }),
);

export const Origin = styled.span(({ theme: { palette: { black } } }) => ({
  alignItems: 'center',
  color: transparentize(0.33, black),
  display: 'flex',
  fontSize: '0.75rem',
  fontWeight: 400,
  lineHeight: '18px',
  margin: 0,
  '> span': {
    marginLeft: '0.25rem',
  },
}));

export const DeliveryInfo = styled(Origin)({});

export const Info = styled.div(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.33, black),
  fontSize: '0.8rem',
  margin: 0,
}));

export const Price = styled.span({
  fontSize: '0.8rem',
  fontWeight: 500,
  paddingBottom: '0.5rem',
});

export const Buttons = styled.div({
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.8rem',
  '> *': {
    flex: 1,
  },
});
