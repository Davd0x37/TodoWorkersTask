import { IUserSkill } from '@/types';

import styled from 'styled-components';

const Skill = styled.div`
  color: var(--success);
  padding: 0.5rem;
`;

export const UserSkill = ({ data }: { data: IUserSkill }) => {
  return (
    <Skill>
      <p>{data.name}</p>
      <progress value={data.stage} max="10" />
    </Skill>
  );
};
