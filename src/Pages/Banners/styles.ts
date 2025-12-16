import styled from 'styled-components'

export const Title = styled.h1`
  color: var(--roxo-700, #502665);
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 24px;
`

export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  border-radius: 5px;
  height: 50px;
  gap: 8px;
  background: linear-gradient(90deg, var(--roxo-700, #502665) 0%, var(--Roxo-500, #7d37a1) 100%);
  color: #fff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
  margin-bottom: 24px;
  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
`

export const Subtitle = styled.h1`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 24px;
`

export const TableTitle = styled.h1`
  color: var(--roxo-700, #502665);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 24px;
`

export const BannersContainer = styled.div`
  height: 129.167px;
  background-color: green;
  margin-bottom: 24px;
`

export const TableContainer = styled.div`
  width: calc(100vw - 56px - 59px); /* força ocupar a largura real da tela */
  max-width: calc(100vw - 56px - 59px);
  overflow-x: auto; /* garante scroll horizontal */
  overflow-y: hidden;
  padding-bottom: 8px;
  padding-right: 24px;
`
