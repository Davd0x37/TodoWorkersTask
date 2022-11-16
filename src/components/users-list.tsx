import { useSelection } from '@/contexts/selection-context';
import { useUserList } from '@/contexts/user-list-context';
import { Wrapper } from '@/shared-styles';
import { IUser, UserID, UserRank } from '@/types';
import { ChangeEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from './atoms';
import { ActionButton } from './atoms/action-button';
import { Checkbox } from './atoms/checkbox';
import { Flex } from './atoms/flex';
import { Table, Title, Details, Summary, Row } from './table';
import { UserSkill } from './user-skills';

const ListWrapper = styled.div`
  ${Wrapper}
`;

const ActionButtons = styled.div`
  text-align: right;
`;

const Toolbar = styled.div`
  height: 50px;
`;

const ToolbarButtons = styled(ActionButtons)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexWrapper = styled(Flex)`
  flex-wrap: wrap;
`;

const newUsersList: IUser[] = [
  {
    id: 0,
    firstname: 'Jon',
    lastname: 'Doe',
    rank: UserRank.Mid,
    salary: 30.95,
    skills: [
      { name: 'JS', stage: 7 },
      { name: 'HTML', stage: 5 },
      { name: 'CSS', stage: 5 },
    ],
  },
  {
    id: 1,
    firstname: 'Jane',
    lastname: 'Doe',
    rank: UserRank.Senior,
    salary: 38,
    skills: [
      { name: 'JS', stage: 10 },
      { name: 'HTML', stage: 10 },
      { name: 'CSS', stage: 10 },
      { name: 'C#', stage: 10 },
    ],
  },
];

export const UsersList = () => {
  const userListCtx = useUserList();
  const useSelectionCtx = useSelection();

  const selectedUsers = useSelectionCtx?.selectedItems.length ?? 0;

  useEffect(() => {
    return () => {
      if (userListCtx) {
        userListCtx.addUser(newUsersList[0]);
        userListCtx.addUser(newUsersList[1]);
      }
    };
  }, []);

  const handleCheckbox = useCallback(
    (ev: ChangeEvent<HTMLInputElement>, userId: UserID) => {
      if (ev.target.checked) {
        useSelectionCtx?.addSelection(userId);
      } else {
        useSelectionCtx?.removeSelection(userId);
      }
    },
    [useSelectionCtx?.selectedItems]
  );

  const handleEdit = (userId: UserID) => {
    userListCtx?.markUserToModify(userId);
  };

  const handleRemove = (userId: UserID) => {
    const conf = confirm('Usunac?');
    if (conf) {
      userListCtx?.removeUser(userId);
    }
  };

  const handleRemoveSelected = () => {
    if (userListCtx && useSelectionCtx && useSelectionCtx.selectedItems.length > 0) {
      const conf = confirm('Usunac wybranych?');
      if (conf) {
        userListCtx.removeUsers(useSelectionCtx.selectedItems);
        useSelectionCtx.clearSelections();
      }
    }
  };

  return (
    <ListWrapper>
      <Toolbar>
        {selectedUsers > 0 ? (
          <ToolbarButtons>
            <Button onClick={handleRemoveSelected}>Usuń wybrane</Button>
          </ToolbarButtons>
        ) : (
          ''
        )}
      </Toolbar>
      {userListCtx && userListCtx.usersList.length > 0 && (
        <Table>
          <Row>
            <Title></Title>
            <Title>#</Title>
            <Title>Pracownik</Title>
            <Title>Ranga</Title>
            <Title>Wynagrodzenie (hr / M)</Title>
            <Title>Akcje</Title>
          </Row>

          {userListCtx.usersList.map((user, idx) => (
            <Details key={idx}>
              <Summary>
                <Row>
                  <Checkbox
                    id={idx + user.id + ''}
                    name="selection"
                    // checked={useSelectionCtx?.isSelected(user.id) || false}
                    onChange={(ev) => handleCheckbox(ev, user.id)}
                  ></Checkbox>
                  <p>{idx}</p>
                  <p>{user.firstname + user.lastname}</p>
                  <p>{user.rank}</p>
                  <p>
                    {user.salary} per hr / {userListCtx?.getUserSalary(user.id)} PLN
                  </p>
                  <ActionButtons>
                    <ActionButton className="--info" onClick={() => handleEdit(user.id)}>
                      <i className="las la-pen"></i>
                    </ActionButton>
                    <ActionButton className="--error" onClick={() => handleRemove(user.id)}>
                      <i className="las la-trash-alt"></i>
                    </ActionButton>
                  </ActionButtons>
                </Row>
              </Summary>
              <FlexWrapper>
                {user.skills.map((skill, skill_idx) => (
                  <UserSkill key={skill.stage + '' + skill_idx} data={skill}></UserSkill>
                ))}
              </FlexWrapper>
            </Details>
          ))}
        </Table>
      )}
    </ListWrapper>
  );
};
