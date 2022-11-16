import { useUserList } from '@/contexts/user-list-context';
import { Wrapper } from '@/shared-styles';
import styled from 'styled-components';
import { Label } from './atoms';
import { Flex } from './atoms/flex';

const ListWrapper = styled.div`
  ${Wrapper}
  margin-top: 2rem;
`;

const Row = styled.div`
  border-bottom: 1px solid var(--shade-dark);
  padding: 1rem 0;

  &:last-child {
    border: none;
  }
`;

const Content = styled.div`
  display: block;
`;

const FlexWrapper = styled(Flex)`
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const UsersStats = () => {
  const userListCtx = useUserList();

  const skillsList = userListCtx && Object.entries(userListCtx?.getSkillsCount());

  return (
    <ListWrapper>
      <Row>
        <Label>Suma wszystkich wynagrodzeń</Label>
        <Content>{userListCtx?.getSalarySum().toFixed(2)} PLN</Content>
      </Row>

      {userListCtx?.usersList && userListCtx?.usersList.length > 0 && (
        <Row>
          <FlexWrapper>
            {userListCtx.usersList.map((user, idx) => {
              return (
                <div key={idx + '' + user.id}>
                  <Label>{user.firstname}</Label>
                  <Content>{userListCtx?.getUserSalary(user.id)} PLN</Content>
                </div>
              );
            })}
          </FlexWrapper>
        </Row>
      )}

      {skillsList && skillsList.length > 0 && (
        <Row>
          <FlexWrapper>
            {skillsList.map(([skill, counter], idx) => {
              return (
                <div key={idx}>
                  <Label>{skill}</Label>
                  <Content>{counter}</Content>
                </div>
              );
            })}
          </FlexWrapper>
        </Row>
      )}
    </ListWrapper>
  );
};
