import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)(
  ({
    theme: {
      palette: { primary },
    },
  }) => ({
    color: primary,
  }),
);
