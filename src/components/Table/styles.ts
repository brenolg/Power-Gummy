import styled from 'styled-components'

interface Style {
  $columnNumber: number
  $width?: any
  $columnsWidths?: number[]
  $columnGap?: number
  $rowHight?: number
}

export const Table = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
  max-width: ${({ $width }) => $width}px;
  border-radius: 12px;
  margin-right: 24px;
  border: 1px solid #eeeeee;
  background: #fff;
`

export const Header = styled.div<{ $columnNumber: number; $columnsWidths?: number[] }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$columnsWidths
      ? props.$columnsWidths.map((w) => `minmax(0, ${w}px)`).join(' ')
      : `repeat(${props.$columnNumber}, minmax(0, 1fr))`};
  background: #fafafa;
  padding: 12px 16px;
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 133.333% */
  letter-spacing: 0.48px;
  border-bottom: 1px solid #eee;

  .grid-header {
    text-transform: uppercase;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
  }
`

export const TableContent = styled.div<Style>`
  width: 100%;

  .table-row {
    display: grid;
    grid-template-columns: ${(props) =>
      props.$columnsWidths
        ? props.$columnsWidths.map((w) => `minmax(0, ${w}px)`).join(' ')
        : 'repeat(' + props.$columnNumber + ', minmax(0, 1fr))'};
    padding: 0 16px;
    height: ${(props) => props.$rowHight ?? 40}px;
    border-bottom: 1px solid #eee;
    align-items: center;
  }

  .table-cell {
  }
  .grid-index {
    color: var(--roxo-700, #502665);
    font-family: 'Nunito Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.48px;
    text-transform: uppercase;
  }
  .grid-item {
    color: #1c1d22;
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.28px;
    white-space: nowrap;

    text-overflow: ellipsis;
    min-width: 0;
    padding-right: 10px;
    .platform {
      height: 40px;
    }
  }
  .hidden {
    overflow: hidden;
  }
  .golden {
    color: var(--dourado-200, #ba7e1b);
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .purple {
    color: var(--dourado-200, #502665);
    font-family: 'Nunito Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .grid-action-area {
    display: flex;
    gap: 16px;
    width: 110px;
  }
  .grid-action-btn {
    width: 16px;
    display: flex;
    height: 20px;
    align-items: center;
    line-height: 16px;
    color: #502665;

    font-feature-settings:
      'liga' off,
      'clig' off;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 14px;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #eeeeee;
  color: var(--roxo-700, #502665);
  text-align: right;

  /* Caption */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 150% */
  letter-spacing: 0.36px;
  letter-spacing: 0.48px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  .table-chevron {
    width: 24px;
    height: 20px;
    cursor: pointer;
  }
  .table-chevron.advance {
    transform: rotate(180deg);
  }
  .right-container {
    display: flex;
    gap: 20px;
  }
  .pagination-container {
    display: flex;
    gap: 10px;
  }
`
