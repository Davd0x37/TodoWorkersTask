import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  border-radius: var(--radius);
  border: none;
  font-size: 1.1rem;
  padding: 5px;
  width: 27px;
  height: 27px;
  margin: 0 2px;
  cursor: pointer;

  &.--success {
    background-color: #3a986c;

    &:hover {
      background-color: #3a986c90;
    }
  }
  &.--info {
    background-color: #171927;

    &:hover {
      background-color: #17192790;
    }
  }
  &.--warning {
    background-color: #b78834;

    &:hover {
      background-color: #b7883490;
    }
  }
  &.--error {
    background-color: #f44336;

    &:hover {
      background-color: #f4433690;
    }
  }
`;

export const ActionButton = ({ children, ...props }: ComponentPropsWithoutRef<'button'> & PropsWithChildren) => {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
};
