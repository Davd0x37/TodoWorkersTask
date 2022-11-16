import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1px;
  height: 1px;
  position: absolute;
  display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  border-radius: var(--radius);
  width: 15px;
  height: 15px;
  cursor: pointer;
  background: ${(props) => (props.checked ? 'var(--secondary)' : 'var(--accent-dark)')};
`;

export const Checkbox = (
  { /* checked, */ onChange, ...props }: ComponentPropsWithoutRef<'input'> /* & { checked: boolean } */
) => {
  return (
    <input type="checkbox" onChange={onChange} {...props}></input>
    // <CheckboxWrapper>
    // {/* <HiddenCheckbox checked={checked} onChange={onChange}></HiddenCheckbox> */}
    // {/* <StyledCheckbox checked={checked}></StyledCheckbox> */}
    // </CheckboxWrapper>
  );
};
