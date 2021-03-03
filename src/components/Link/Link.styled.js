import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)(
  ({
    bold,
    color,
    theme: {
      palette,
      palette: { black },
    },
  }) => ({
    color: palette[color] || black,
    // fontWeight: bold ? 600 : 400,
  }),
);
