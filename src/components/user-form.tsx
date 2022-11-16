import { useUserList } from '@/contexts/user-list-context';
import { useForm } from '@/hooks/use-form.hooks';
import { useSkills } from '@/hooks/use-skills.hooks';
import { Wrapper } from '@/shared-styles';
import { IUser, IUserSkill, UserRank } from '@/types';
import { ChangeEvent, ComponentPropsWithoutRef, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { ActionButton, Button, Input, Label, Option, Select } from './atoms';

const FormWrapper = styled.form`
  ${Wrapper}
`;

const Group = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  // flex-direction: row;
  // flex-wrap: wrap;
  margin-bottom: 2rem;
  grid-gap: 1rem;

  @media (min-width: 979px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
`;

const GroupElement = styled.div`
  padding: 0.5rem;
`;

const ActionSegment = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

interface UserSkillProps {
  skill: IUserSkill;
  onSkillRemove: () => void;
}

const UserSkill = ({ onChange, skill, onSkillRemove }: UserSkillProps & ComponentPropsWithoutRef<'input'>) => {
  return (
    <Group>
      <GroupElement>
        <Label htmlFor="name">Nazwa</Label>
        <Input type="text" name="name" value={skill.name} onChange={onChange} required></Input>
      </GroupElement>
      <GroupElement>
        <Label htmlFor="stage">Poziom</Label>
        <Input type="number" min="0" max="10" name="stage" value={skill.stage} onChange={onChange} required></Input>
      </GroupElement>
      <ActionSegment>
        <ActionButton type="button" onClick={() => onSkillRemove()}>
          <i className="las la-minus-circle"></i>
        </ActionButton>
      </ActionSegment>
    </Group>
  );
};

export const UserForm = () => {
  const userListCtx = useUserList();
  const isEditMode = userListCtx?.modifyID;

  const clearFormData = {
    firstname: '',
    lastname: '',
    rank: UserRank.Junior,
    salary: 0,
    skills: [],
  };

  const { formData, setFormData, updateFormDataElement, handleInputChange } = useForm(clearFormData);
  const { firstname, lastname, rank, salary } = formData;
  const { skillsList, setSkills, addSkill, removeSkill, modifySkill } = useSkills();

  useEffect(() => {
    const userData = userListCtx && userListCtx?.modifyID ? userListCtx.getUser(userListCtx.modifyID) : null;
    if (userData) {
      setSkills([]);
      setFormData(userData);
      setSkills(userData.skills);
    } else {
      setSkills([]);
      setFormData(clearFormData);
    }
    // dodajac 'setSkills' do depsów, runtime dostaje świra i memoizuje wszyskto - nie mozna zaktualizować pól
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userListCtx, userListCtx?.modifyID]);

  useEffect(() => {
    updateFormDataElement('skills', skillsList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillsList]);

  const addField = () => {
    addSkill({ name: '', stage: 0 });
  };

  const handleSkillUpdate = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const data = {
      [e.target.name]: e.target.value,
    } as unknown as IUserSkill;

    modifySkill(data, idx);
  };

  const handleSkillRemove = (idx: number) => () => {
    removeSkill(idx);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (userListCtx) {
      if (isEditMode) {
        userListCtx.modifyUser(formData as IUser);
        userListCtx.markUserToModify(null);
      } else {
        userListCtx.addUser(formData as IUser);
      }
    }
  };

  const skillInputs = skillsList.map((skill, idx) => {
    return (
      <UserSkill
        key={idx}
        skill={skill}
        onChange={(e) => handleSkillUpdate(e, idx)}
        onSkillRemove={handleSkillRemove(idx)}
      ></UserSkill>
    );
  });

  return (
    <FormWrapper onSubmit={(ev) => handleSubmit(ev)}>
      <Group>
        <GroupElement>
          <Label htmlFor="firstname">Imię</Label>
          <Input type="text" name="firstname" value={firstname} onChange={handleInputChange} required></Input>
        </GroupElement>
        <GroupElement>
          <Label htmlFor="lastname">Nazwisko</Label>
          <Input type="text" name="lastname" value={lastname} onChange={handleInputChange} required></Input>
        </GroupElement>
      </Group>
      <Group>
        <GroupElement>
          <Label htmlFor="salary">Stawka godzinowa</Label>
          <Input
            type="number"
            min="1"
            step="0.01"
            name="salary"
            value={salary}
            onChange={handleInputChange}
            required
          ></Input>
        </GroupElement>
        <GroupElement>
          <Label htmlFor="rank">Ranga</Label>
          <Select name="rank" value={rank} onChange={handleInputChange} required>
            <Option value="junior">Junior</Option>
            <Option value="mid">Mid</Option>
            <Option value="senior">Senior</Option>
          </Select>
        </GroupElement>
      </Group>

      {skillInputs}

      <Group>
        <Button type="button" className="--info" onClick={() => addField()}>
          <i className="las la-plus-circle"></i>
        </Button>
        <Button type="submit">{isEditMode ? 'Zmodyfikuj' : 'Dodaj'}</Button>
      </Group>
    </FormWrapper>
  );
};
