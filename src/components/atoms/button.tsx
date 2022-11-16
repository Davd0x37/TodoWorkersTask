import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: var(--secondary);
  color: var(--secondary-dark);
  border: none;
  outline: none;
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius);
  height: 45px;
  transition: background-color linear 125ms;
  color: var(--text-color-dark);
  font-weight: bold;
  font-size: 1.5rem;

  span {
    display: none;
  }

  @media (min-width: 979px) {
    span {
      display: block;
    }
  }

  &:hover {
    background-color: var(--accent-dark);
    cursor: pointer;
  }

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

export const Button = ({ children, ...props }: ComponentPropsWithoutRef<'button'> & PropsWithChildren) => {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
};
