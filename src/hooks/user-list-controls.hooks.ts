import { useAppReducer, UserActions } from '@/state';
import { IUser, UserID } from '@/types';
import { useCallback, useState } from 'react';

export const useUserListControls = () => {
  const [state, dispatch] = useAppReducer();
  const [modifyID, setModifyID] = useState<number | null>(null);

  const addUser = (user: IUser) => {
    dispatch({
      type: UserActions.ADD_USER,
      payload: user,
    });
  };

  const modifyUser = (user: IUser) => {
    dispatch({ type: UserActions.MODIFY_USER, payload: user });
  };

  const removeUser = (userId: UserID) => {
    dispatch({ type: UserActions.REMOVE_USER, payload: { id: userId } as never });
  };

  const removeUsers = (userIds: UserID[]) => {
    userIds.forEach((userId) => dispatch({ type: UserActions.REMOVE_USER, payload: { id: userId } as never }));
  };

  const getUserSalary = useCallback(
    (userId: UserID) => {
      const user = state.usersList.find((user) => user.id === userId);
      return user ? (user.salary * 168).toFixed(0) : 0;
    },
    [state.usersList]
  );

  const getSalarySum = useCallback(
    () => state.usersList.reduce((acc, user) => acc + user.salary * 168, 0),
    [state.usersList]
  );

  const getUser = useCallback(
    (userId: UserID) => state.usersList.find((user) => user.id === userId),
    [state.usersList]
  );

  const markUserToModify = (userId: UserID | null) => {
    setModifyID(userId);
  };

  const getSkillsCount = useCallback(() => {
    const skillsMap: Record<string, number> = {};

    state.usersList.forEach((user) => {
      user.skills.forEach((skill) => {
        const value = skill.name in skillsMap ? skillsMap[skill.name] + 1 : 1;
        skillsMap[skill.name] = value;
      });
    });

    return skillsMap;
  }, [state, state.usersList]);

  return {
    usersList: state.usersList,
    modifyID,
    addUser,
    modifyUser,
    markUserToModify,
    getSkillsCount,
    removeUser,
    removeUsers,
    getSalarySum,
    getUserSalary,
    getUser,
  };
};
