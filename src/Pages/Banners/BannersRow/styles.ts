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

export const DeviceLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  color: #1c1d22;
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`

interface PositionDropdownProps {
  $open: boolean
}

export const PositionDropdown = styled.div<PositionDropdownProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 72px;
  padding: 8px 12px;
  border-radius: 8px;

  background: #eee9f1;
  color: #4b2b7f;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
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
`

export const PositionArrow = styled.span<{ $open: boolean }>`
  width: 6px;
  height: 6px;

  display: inline-block;

  border-right: 2px solid #4b2b7f;
  border-bottom: 2px solid #4b2b7f;

  transform: ${({ $open }) => ($open ? 'rotate(-135deg)' : 'rotate(45deg)')};
  transition: transform 0.2s ease;
`

export const PositionMenu = styled.div`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;

  width: 100%;
  background: #fff;

  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  z-index: 10;
  position: absolute;
  margin-top: 6px;
  width: 92px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 20;
`

export const PositionOption = styled.div<{ $selected: boolean }>`
  padding: 8px 12px;
  font-size: 14px;

  cursor: pointer;

  color: ${({ $selected }) => ($selected ? '#4b2b7f' : '#333')};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};

  &:hover {
    background: #f4f1f7;
  }
`

export const PositionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 72px;
  padding: 8px 12px;
  border-radius: 8px;

  background: #eee9f1;
  color: #4b2b7f;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
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
`
