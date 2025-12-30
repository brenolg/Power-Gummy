import styled from 'styled-components'

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 21px;
`

export const EmptyContainer = styled.div`
  width: 100%;
  margin-top: 120px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .bagImg {
    width: 56px;
    height: 63.75px;
  }
  .text {
    color: #868785;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`
export const MobileSummary = styled.div<{ $open: boolean }>`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;

  height: ${({ $open }) => ($open ? '100%' : '0')};
  overflow: hidden;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};

  transition:
    height 0.35s ease,
    opacity 0.25s ease;
`
