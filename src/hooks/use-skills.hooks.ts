import { IUserSkill } from '@/types';
import { merge } from '@/utils';
import { useState, useCallback, useMemo } from 'react';

export const useSkills = () => {
  const [skillsList, setSkillsList] = useState<IUserSkill[]>([]);

  const modifySkill = useCallback(
    (data: IUserSkill, cIdx: number) => {
      const newList = skillsList.map((skill, index) => (cIdx === index ? merge(skill, data) : skill));

      setSkillsList(newList);
    },
    [skillsList]
  );

  const addSkill = (skill: IUserSkill) => {
    const newList = [...skillsList, skill];
    setSkillsList(newList);
  };

  const removeSkill = (idx: number) => {
    const newList = skillsList.filter((_, index) => index !== idx);
    setSkillsList(newList);
  };

  const setSkills = (skills: IUserSkill[]) => {
    setSkillsList(skills);
  };

  return {
    skillsList,
    setSkills,
    addSkill,
    modifySkill,
    removeSkill,
  };
};
