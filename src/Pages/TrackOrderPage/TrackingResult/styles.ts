import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 40px 80px;
  min-height: calc(100vh - 88px);
  width: 100%;
  margin: auto;
  background:
    linear-gradient(0deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 100%),
    linear-gradient(
      135deg,
      var(--Roxo-300, #a559cb) 0%,
      var(--roxo-700, #502665) 50%,
      var(--Roxo-800, #3f2049) 100%
    );
  @media (max-width: 650px) {
    min-height: calc(100vh - 60px);
    padding: 30px 24px;
  }
`

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 40px;
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h2`
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
  margin-bottom: 8px;
`

export const CodeMuted = styled.span`
  color: var(--Grey-400, #a3a3a3);
  font-family: 'Nunito Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`

export const TrackingCode = styled.span`
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 8px;
`

export const NewSearchButton = styled.button`
  width: 180px;
  height: 50px;
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
  background: linear-gradient(90deg, var(--roxo-700, #502665) 0%, var(--Roxo-500, #7d37a1) 100%);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export const HistoryTitle = styled.h3`
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`

export const Card = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.48);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Item = styled.div`
  display: flex;
  gap: 12px;
`

export const IconDot = styled.div`
  width: 16px;
  height: 16px;
  background: #712b89;
  border-radius: 50%;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 8px;
    height: 6px;
    aspect-ratio: 4/3;
  }
`

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ItemTitle = styled.span`
  color: #4b2567;
  font-weight: 700;
  font-size: 14px;
`

export const ItemDate = styled.span`
  color: var(--Grey-400, #a3a3a3);
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

export const ItemDescription = styled.p`
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
