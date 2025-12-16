import styled from 'styled-components'
import { colors, typography } from '../../../styles/themeUtils'

export const SelectWrapper = styled.div<{ error?: string }>`
  position: relative;
  cursor: pointer;
  .chevron {
    position: absolute;
    right: 12px;
    top: 50%;
    width: 16px;
    height: 16px;
    transform: translateY(-50%);
    transition: 0.2s ease-in-out;
    pointer-events: none;
  }

  .chevron.open {
    transform: translateY(-50%) rotate(180deg);
  }
`

export const SelectDisplay = styled.input<{
  disabled?: boolean
  error?: string
}>`
  display: flex;
  align-items: center;
  padding: 16px;
  transition: all 0.3s ease-out;
  height: 48px;
  outline: none;
  border-radius: 5px;
  border: 1px solid;
  width: 100%;
  max-width: 100%;
  border: 1px solid ${(t) => colors(t).neutral.grey500};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
  color: ${(t) => colors(t).neutral.black700};
  outline: none;

  transition: all 0.3s ease-out;
  background-color: ${({ disabled }) => (disabled ? '#EEEEEE' : '#fff')};
  background: ${(props) => (props.disabled ? '#EEEEEE' : 'red')};
  background: ${(t) => colors(t).neutral.white0};
  border: 1px solid;

  border-color: ${(props) => (props.disabled ? 'red' : props.error ? '#D61212' : '#CCCCCC')};
  &:hover {
    border-color: ${(props) => (props.disabled ? '#B00000' : props.error ? '#B00000' : '#EBD7F5')};
  }
  &:disabled {
    color: rgb(84, 84, 84);
  }
  &::placeholder {
    color: rgb(84, 84, 84);
  }
  ${(t) => typography(t).input};
  &:hover {
    border: 1px solid var(--Roxo-25, #ebd7f5);
    background: var(--Roxo-0, #fdfbfe);
  }
  &:focus {
    border: 1px solid var(--roxo-700, #502665);
    background: var(--Color-Neutral-White-0, #fff);
  }
`

export const Dropdown = styled.div`
  position: absolute;
  top: 105%;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  z-index: 99;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
  }
  /* Barra fina */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b5b5b5;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9a9a9a;
  }
`

export const DropdownItem = styled.div<{ $isSelected?: boolean }>`
  padding: 12px 0 12px 18.5px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  color: ${(t) => colors(t).neutral.black700};
  background: ${(t) => colors(t).neutral.white0};
  color: ${(props) => (props.$isSelected ? '#5a5a5aff' : '#424242')};
  &:hover {
    background-color: #dfdfdfff;
  }

  background: ${(t) => colors(t).neutral.white0};
  ${(t) => typography(t).input};
`
