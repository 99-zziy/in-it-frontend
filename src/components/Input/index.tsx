import { useInputType } from '@/hooks/useInput';
import styled from 'styled-components';

export interface InputProps {
  input: useInputType;
  label?: string;
  type: string;
  placeholder?: string;
  className?: string;
}

const InputContainer = styled.div`
  margin: 10px 0px;
`;

const Label = styled.p`
  margin-bottom: 0.5em;
  color: white;
`;

const InputWrapper = styled.input`
  font-size: 1rem;
  padding: 0.5em;
  border: none;
  border-radius: 0.3em;
  width: calc(100% - 1em);
  height: 30px;
  background-color: ${({ theme }) => theme.backgrondLightColor};
  color: ${({ theme }) => theme.textColor};
  ::placeholder {
    color: darkgray;
    font-size: 0.8rem;
  }
  :focus {
    outline: none;
  }
`;

const Input = ({ input, label, type, placeholder = '', className }: InputProps) => (
  <InputContainer>
    {label && <Label>{label}</Label>}
    <InputWrapper
      type={type}
      placeholder={placeholder}
      value={input.value}
      onChange={input.onChange}
      className={className}
    />
  </InputContainer>
);

export default Input;
