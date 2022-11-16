import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--shade-light);
`;

const RowWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 30px 30px 1fr 0.7fr 0.8fr 0.5fr;
  grid-gap: 0.5rem;
`;

const TitleWrapper = styled.p`
  &:last-child {
    text-align: right;
  }
`;

const DetailsWrapper = styled.details`
  border-bottom: 1px solid var(--border-color);

  &:hover {
    cursor: pointer;
  }
`;

const SummaryWrapper = styled.summary`
  &::marker {
    content: none;
  }
`;

export const Table = ({ children, ...props }: ComponentPropsWithoutRef<'div'> & PropsWithChildren) => {
  return <TableWrapper {...props}>{children}</TableWrapper>;
};

export const Row = ({ children, ...props }: ComponentPropsWithoutRef<'div'> & PropsWithChildren) => {
  return <RowWrapper {...props}>{children}</RowWrapper>;
};

export const Title = ({ children, ...props }: ComponentPropsWithoutRef<'p'> & PropsWithChildren) => {
  return <TitleWrapper {...props}>{children}</TitleWrapper>;
};

export const Details = ({ children, ...props }: ComponentPropsWithoutRef<'details'> & PropsWithChildren) => {
  return <DetailsWrapper {...props}>{children}</DetailsWrapper>;
};

export const Summary = ({ children, ...props }: ComponentPropsWithoutRef<'summary'> & PropsWithChildren) => {
  return <SummaryWrapper {...props}>{children}</SummaryWrapper>;
};
