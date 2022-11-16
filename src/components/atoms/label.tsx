import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const LabelWrapper = styled.label`
  color: var(--text-info);
  display: inline-block;
  font-size: 0.8rem;
`;

export const Label = ({ children, ...props }: ComponentPropsWithoutRef<'label'> & PropsWithChildren) => {
  return <LabelWrapper {...props}>{children}</LabelWrapper>;
};
