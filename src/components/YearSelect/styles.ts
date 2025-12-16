import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  width: 83px;
`

export const Trigger = styled.button`
  width: 100%;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--roxo-700, #502665);

  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.14px;
  cursor: pointer;
`

export const Chevron = styled.img<{ open: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${({ open }) => (open ? '180deg' : '0deg')});
`

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% -20px);
  left: 0;

  width: 100%;
  max-height: 220px;
  overflow-y: auto;

  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

export const Option = styled.div<{ $active?: boolean }>`
  padding: 4px 8px;
  cursor: pointer;

  font-weight: 600;

  background: ${({ $active }) => ($active ? '#dfdfdfff' : 'transparent')};
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 157.143% */
  letter-spacing: 0.14px;
  cursor: pointer;
  &:hover {
    background-color: #dfdfdfff;
  }
`
