import { IAppState, IUser } from '@/types';
import { useReducer } from 'react';

export enum UserActions {
  ADD_USER = 'add_user',
  REMOVE_USER = 'remove_user',
  MODIFY_USER = 'modify_user',
}

const AppState: IAppState = {
  usersList: [],
};

interface Action {
  type: UserActions;
  payload: IUser;
}

const AppReducer = (state: IAppState, action: Action) => {
  switch (action.type) {
    case UserActions.ADD_USER: {
      const userData = {
        ...action.payload,
        id: state.usersList.length + 1,
      };

      return {
        ...state,
        usersList: [...state.usersList, userData],
      };
    }

    case UserActions.REMOVE_USER: {
      return {
        ...state,
        usersList: state.usersList.filter((user) => user.id !== action.payload.id),
      };
    }

    case UserActions.MODIFY_USER: {
      const modifiedList = state.usersList.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload,
          };
        }

        return user;
      });

      return {
        ...state,
        usersList: modifiedList,
      };
    }

    default: {
      return state;
    }
  }
};

export const useAppReducer = () => useReducer(AppReducer, AppState);
