import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 24px;
  color: #000;
  font-family: 'Nunito Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  padding-top: 0;
`

export const Title = styled.div`
  color: var(--Color-Neutral-Black-800, #1c1d22);

  /* H1 - Títulos */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const Warning = styled.div`
  display: flex;
  padding: 16px;
  img {
    width: 16px;
    height: 16px;
  }

  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  color: #ba7e1b;
  font-family: 'Red Hat Text';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 8px;
  background: rgba(186, 126, 27, 0.04);
`
