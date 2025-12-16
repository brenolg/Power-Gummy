import styled from 'styled-components'

interface StatusValueProps {
  $active: boolean
}

export const StatusValue = styled.div<StatusValueProps>`
  display: flex;
  width: 92px;
  padding: 5px 10px;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;

  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  color: ${({ $active }) => ($active ? '#28C76F' : '#BDBDBD')};
  background: ${({ $active }) =>
    $active ? 'rgba(40, 199, 111, 0.16)' : 'rgba(189, 189, 189, 0.16)'};
`

interface StatusProps {
  $active: boolean
  open: boolean
}

export const StatusDropdown = styled.div<Pick<StatusProps, '$active'>>`
  width: 92px;
  padding: 5px 10px;
  border-radius: 4px;
  font-family: Inter;
  cursor: pointer;
  position: relative;

  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;

  color: ${({ $active }) => ($active ? '#28C76F' : '#BDBDBD')};
  background: ${({ $active }) =>
    $active ? 'rgba(40, 199, 111, 0.16)' : 'rgba(189, 189, 189, 0.16)'};
`

export const StatusArrow = styled.span<Pick<StatusProps, '$active'>>`
  position: absolute;
  right: 10px;
  top: 50%;
  width: 6px;
  height: 6px;
  border-left: 2px solid ${({ $active }) => ($active ? '#28C76F' : '#BDBDBD')};
  border-bottom: 2px solid ${({ $active }) => ($active ? '#28C76F' : '#BDBDBD')};
  transform: translateY(-50%) rotate(-45deg);
`

export const StatusMenu = styled.div`
  position: absolute;
  margin-top: 6px;
  width: 92px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 20;
`

export const StatusOption = styled.div<{ $isActive?: boolean }>`
  padding: 8px 12px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  cursor: pointer;
  font-size: 14px;
  color: #646464ff;

  background: ${({ $isActive }) => ($isActive ? '#f2f4f7' : 'white')};

  &:hover {
    background: #f2f4f7;
  }
`
