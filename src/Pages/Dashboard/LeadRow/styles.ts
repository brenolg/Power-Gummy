import styled from 'styled-components'

export const ImageContainer = styled.div<{ $img: string; $isGold?: boolean }>`
  border-radius: 12px;
  border: 2px solid #fff;
  border-radius: 12px;
  height: 48px;
  width: 48px;
  border: 2px solid #fff;
  position: relative;
  background: ${({ $img, $isGold }) =>
    `url(${$img}) ${$isGold ? 'rgba(186, 126, 27, 0.80)' : '#ebd7f5'} 3.589px 10px / 88.783% 71.538% no-repeat`};

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`

export const Images = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  height: 72px;
`

export const ProductContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  height: 72px;
`
type DotProps = {
  $golden?: boolean
}

export const Dot = styled.div<DotProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;

  background-color: ${({ $golden }) => ($golden ? '#BA7E1B' : '#502665')};
`
