import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.input`
  display: block;
  line-height: 1.5;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--text-info);
  color: var(--text-color);
  height: 45px;
  width: 100%;
`;

export const Input = ({ children, ...props }: ComponentPropsWithoutRef<'input'> & PropsWithChildren) => {
  return <InputWrapper {...props}>{children}</InputWrapper>;
};
