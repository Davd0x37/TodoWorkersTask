import { useUserList } from '@/contexts/user-list-context';
import { useForm } from '@/hooks/use-form.hooks';
import { IFormAttributes, IFormComponent, IFormField, IFormSchema, IUser, UserRank } from '@/types';
import { FormEvent, PropsWithChildren, RefObject, useCallback, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  background-color: var(--brand);
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Element = styled.div`
  width: 100%;
`;

const GroupElement = styled.div`
  width: 50%;
`;

const Label = styled.label``;
const Input = styled.input``;

const Button = styled.button`
  background-color: var(--secondary);
  color: var(--secondary-dark);
`;

interface Props {
  schema: IFormSchema;
  onChange: (...data: any[]) => any;
  onSubmit: (...data: any[]) => any;
}

const schema: IFormSchema = [
  {
    name: 'firstname',
    label: 'First name',
    component: IFormComponent.INPUT,
    attributes: {
      type: 'text',
      defaultValue: '',
      required: true,
    },
  },
  {
    name: 'lastname',
    label: 'Last name',
    component: IFormComponent.INPUT,
    attributes: {
      type: 'text',
      defaultValue: '',
      required: true,
    },
  },
  {
    name: 'salary',
    label: 'Salary (hourly)',
    component: IFormComponent.INPUT,
    attributes: {
      type: 'number',
      defaultValue: 0,
      required: true,
    },
  },
  {
    name: 'level',
    label: 'Level',
    component: IFormComponent.SELECT,
    attributes: {
      required: true,
    },
    options: [
      { value: 'junior', label: 'Junior' },
      { value: 'regular', label: 'Regular' },
      { value: 'senior', label: 'Senior' },
    ],
  },
];

function createAttributes(attributes: IFormAttributes) {
  return Object.entries(attributes).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
}

export const Form = ({ children, schema, onChange, onSubmit }: Props & PropsWithChildren) => {
  // const { handleInputChange, onSubmit } = useForm({ schema });

  // const userListCtx = useUserList();
  // const formControls = useForm({ schema });

  const generateElement = useCallback((field: IFormField) => {
    const attributes = (field.attributes && createAttributes(field.attributes)) || '';

    switch (field.component) {
      case IFormComponent.TEXT: {
        return (
          <>
            <Label>{field.label}</Label>
          </>
        );
      }

      case IFormComponent.INPUT: {
        return (
          <>
            {field?.label ? <Label>{field.label}</Label> : ''}
            <Input {...attributes}></Input>
          </>
        );
      }

      case IFormComponent.CHECKBOX: {
        break;
      }

      case IFormComponent.RADIO: {
        break;
      }

      case IFormComponent.SELECT: {
        break;
      }

      default: {
        break;
      }
    }
  }, []);

  const fields = schema.map((field) => generateElement(field)).filter((field) => field);

  const onFormChange = (ev: FormEvent<HTMLFormElement>) => {
    console.log(ev);
    // onChange(ev, '' as any);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(schema);
    // onSubmit('' as any);
  };

  return (
    <FormWrapper onChange={(ev) => onFormChange(ev)} onSubmit={(ev) => handleSubmit(ev)}>
      {fields}
      {/* <Group>
        <GroupElement>
          <Label htmlFor="firstname">Imię</Label>
          <Input type="text" id="firstname" value={''}></Input>
        </GroupElement>
        <GroupElement>
          <Label htmlFor="lastname">Nazwisko</Label>
          <Input type="text" id="lastname" value={''}></Input>
        </GroupElement>
      </Group>
      <Group>
        <Element>
          <Label htmlFor="level">Nazwisko</Label>
          <Input type="text" id="level" value={''}></Input>
        </Element>
      </Group> */}
      <Button type="submit">Dodaj</Button>
    </FormWrapper>
  );
};
