import styled from 'styled-components'

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Card = styled.div`
  width: 258.797px;
  height: 452px;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  @media (max-width: 900px) {
    width: 258px;
    height: 372px;
  }
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 39.892px;
  height: 39.892px;
`

export const PlayTriangle = styled.img``

export const Text = styled.p`
  position: absolute;
  bottom: 20px;
  left: 24.1px;
  width: 210px;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  background: linear-gradient(90deg, #fdfbfe 0%, #b2872e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`
