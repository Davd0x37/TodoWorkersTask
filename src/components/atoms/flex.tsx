import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Flex = ({ children, ...props }: ComponentPropsWithoutRef<'div'> & PropsWithChildren) => {
  return <FlexWrapper {...props}>{children}</FlexWrapper>;
};
