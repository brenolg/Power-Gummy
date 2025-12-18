import styled from 'styled-components'

export const MainContainer = styled.div`
  padding: 50px;
  padding-top: 0;
`
export const MainTitle = styled.h1`
  color: #000;

  /* H1 - Títulos */
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 32px;
`

export const SubTtile = styled.h2`
  color: var(--roxo-700, #502665);
  font-family: 'Nunito Sans';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 8px;
`

export const CardsContainer = styled.div`
  display: flex;
  gap: 160px;
  margin-bottom: 38px;
`
export const FileDescription = styled.h2`
  color: #9e9e9e;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; /* 116.667% */
  margin-bottom: 24px;
`
export const FileCard = styled.div`
  max-width: 432px;
  .title {
    color: var(--roxo-700, #502665);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 12px; /* 75% */
    margin-bottom: 8px;
  }
  .proportion {
    color: var(--Grey-600, #525252);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin-bottom: 16px;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &::before {
      content: '';
      width: 4px;
      height: 4px;
      background: #525252; /* azul */
      border-radius: 50%;
      display: inline-block;
    }
  }
  .previewTitle {
    margin-bottom: 24px;
    color: var(--roxo-700, #502665);
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
  }

  .header {
    width: 100%;
    height: 26px;
    background: #502665eb;
  }
  .mobile-header {
    width: 128.7px;
  }
  .mobile {
    text-align: left;
  }
`

export const ErrorMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-out;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--Vermelho-Alerta, #f00);
  font-family: Inter;
  font-size: 12px;
  height: 12px;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  padding: 2px 4px;
  align-items: center;
  gap: 4px;

  white-space: normal;
  word-break: break-word; /* força quebra dentro da palavra */
  overflow-wrap: anywhere;
  .img-error {
    width: 12px;
    height: 12px;
  }
`

export const BannerPreview = styled.div`
  width: 100%;
  height: 214px;

  border-radius: 4px;

  background-color: #f5f5f5;
  background-image:
    linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
    linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
    linear-gradient(-45deg, transparent 75%, #e0e0e0 75%);
  background-size: 40px 40px;
  background-position:
    0 0,
    0 20px,
    20px -20px,
    -20px 0;
`
export const MobilePreview = styled(BannerPreview)`
  width: 128.7px;
`
