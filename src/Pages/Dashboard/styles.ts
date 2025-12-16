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

export const FlexContainer = styled.div`
  display: flex;
  gap: 24px;
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
