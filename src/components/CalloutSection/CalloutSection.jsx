import React from 'react';
import { useQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';

import { Section } from '@components/Section';

import { GET_SETTINGS } from './Callout.gql';
import * as Styled from './Callout.styled';

export const CalloutSection = () => {
  const { data: { allSettings: [{ calloutText } = {}] = [] } = {} } = useQuery(
    GET_SETTINGS,
  );

  if (!calloutText) return null;

  return (
    <Section>
      <Styled.Callout>
        <Styled.Item>
          <Icon path={mdiInformationOutline} size={1} />
        </Styled.Item>
        <Styled.Item>{calloutText}</Styled.Item>
      </Styled.Callout>
    </Section>
  );
};
