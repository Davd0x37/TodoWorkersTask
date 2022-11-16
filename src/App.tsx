import styled from 'styled-components';
import './App.css';
import { UserForm } from '@/components/user-form';
import { UsersList } from '@/components/users-list';
import { UserListProvider } from '@/contexts/user-list-context';
import { UsersStats } from './components/users-stats';
import { SelectionProvider } from './contexts/selection-context';

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  padding: 2rem;

  @media (min-width: 757px) {
    grid-template-columns: 1fr 0.6fr;
  }
`;

const Aside = styled.aside`
  @media (max-width: 757px) {
    order: -1;
  }
`;

function App() {
  return (
    <AppWrapper>
      <UserListProvider>
        <SelectionProvider>
          <UsersList></UsersList>
        </SelectionProvider>
        <Aside>
          <UserForm></UserForm>
          <UsersStats></UsersStats>
        </Aside>
      </UserListProvider>
    </AppWrapper>
  );
}

export default App;
