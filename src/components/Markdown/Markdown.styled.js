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
  width: '100%',
}));
