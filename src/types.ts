import { RefObject } from 'react';

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export enum UserRank {
  Junior = 'junior',
  Mid = 'mid',
  Senior = 'senior',
}

export interface IUserSkill {
  name: string;
  stage: number;
}

export type UserID = number;

export interface IUser {
  id: UserID;
  firstname: string;
  lastname: string;
  rank: UserRank;
  salary: number;
  skills: IUserSkill[];
}

export interface IAppState {
  usersList: IUser[];
}

// export type FieldElement = RefObject<HTMLInputElement> | null | undefined;
// export type FieldsRecord = {
//   [K in keyof IUser]: FieldElement;
// };

// export type IFormValidator = {
//   element: any;
//   validators?: {
//     required?: boolean;
//     minLength?: number;
//     maxLength?: number;
//   };
// };

// export type IFormSchema<T> = {
//   [K in keyof T]: T[K] extends Primitive ? IFormValidator : IFormSchema<T[K]>;
// };

export enum IFormComponent {
  TEXT = 'text',
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SELECT = 'select',
}

export interface IFormOption {
  value: string;
  label: string;
}

export interface IFormAttributes {
  type?: string;
  defaultValue?: string | number | boolean;
  required?: boolean;
}

export interface IFormField {
  name: string;
  label?: string;
  component: IFormComponent;
  attributes?: IFormAttributes;
  options?: IFormOption[];
}

export type IFormSchema = IFormField[];
