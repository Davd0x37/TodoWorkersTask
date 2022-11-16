import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.select`
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
const OptionWrapper = styled.option``;

export const Select = ({ children, ...props }: ComponentPropsWithoutRef<'select'> & PropsWithChildren) => {
  return <SelectWrapper {...props}>{children}</SelectWrapper>;
};

export const Option = ({ children, ...props }: ComponentPropsWithoutRef<'option'> & PropsWithChildren) => {
  return <OptionWrapper {...props}>{children}</OptionWrapper>;
};
