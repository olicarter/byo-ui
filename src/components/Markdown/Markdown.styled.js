import styled from 'styled-components';
import MarkdownToJSX from 'markdown-to-jsx';

export const Markdown = styled(MarkdownToJSX)(
  ({
    lines,
    theme: {
      palette: { black },
    },
  }) => ({
    color: black,
    display: lines ? '-webkit-box' : 'block',
    overflow: 'hidden',
    WebkitBoxOrient: lines && 'vertical',
    WebkitLineClamp: lines,
  }),
);

export const ImageWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  ':not(:first-of-type)': {
    margin: '1rem 0',
  },
});

export const Image = styled.img({
  maxWidth: '100%',
});

export const Paragraph = styled.p(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.1rem',
  lineHeight: 1.66,
  ':first-of-type': {
    margin: 0,
  },
}));

export const Anchor = styled.a(({ theme: { palette: { black, focus } } }) => ({
  color: black,
  outline: 'none',
  ':focus': {
    color: focus,
  },
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      color: focus,
    },
  },
}));

export const OrderedList = styled.ol({
  margin: 0,
  li: {
    ':not(:first-of-type)': {
      marginTop: '0.5rem',
    },
  },
});

export const UnorderedList = styled.ul({
  margin: 0,
  li: {
    ':not(:first-of-type)': {
      marginTop: '0.5rem',
    },
  },
});
