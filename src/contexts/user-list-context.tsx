import { IUser, UserID } from '@/types';
import { useUserListControls } from '@/hooks/user-list-controls.hooks';
import { createContext, useContext, PropsWithChildren } from 'react';

interface UserFunctions {
  usersList: IUser[];
  modifyID: UserID;
  markUserToModify: (userId: UserID | null) => void;
  getUser: (userId: UserID) => IUser;
  getUserSalary: (userId: UserID) => number;
  getSalarySum: () => number;
  getSkillsCount: () => Record<string, number>;
  addUser: (user: IUser) => void;
  modifyUser: (user: IUser) => void;
  removeUser: (userId: UserID) => void;
  removeUsers: (userIds: UserID[]) => void;
}

const UserListContext = createContext<UserFunctions | null>(null);

export function UserListProvider({ children }: PropsWithChildren) {
  const userListFunction = useUserListControls();

  return <UserListContext.Provider value={userListFunction}>{children}</UserListContext.Provider>;
}

export function useUserList() {
  const state = useContext(UserListContext);
  if (!state) {
    return null;
  }
  return state;
}
