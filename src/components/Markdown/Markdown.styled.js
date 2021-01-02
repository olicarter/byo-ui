import styled from 'styled-components';
import MarkdownToJSX from 'markdown-to-jsx';

export const Markdown = styled(MarkdownToJSX)(
  ({
    theme: {
      palette: { black },
    },
  }) => ({
    color: black,
  }),
);

export const Image = styled.img(() => ({
  margin: '1rem 0',
  width: '100%',
}));

export const Paragraph = styled.p(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.1rem',
  lineHeight: 1.66,
}));

export const Anchor = styled.a(({ theme: { palette: { focus } } }) => ({
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
