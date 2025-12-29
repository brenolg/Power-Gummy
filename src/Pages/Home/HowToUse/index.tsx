import { useEffect, useRef } from 'react'
import { Wrapper, LeftBox, Title, List, VideoBox, BearImage } from './styles'
import { MainButton } from '@/components'
import defaultScrollProps from '@/utils/defaultScrollProps'
import { scroller } from 'react-scroll'

export default function HowToUse() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true

    const playPromise = video.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setTimeout(() => {
            video.pause()
            video.currentTime = 0
            video.muted = false
          }, 1000) // ⏱️ 1 segundo
        })
        .catch(() => {})
    }
  }, [])

  return (
    <Wrapper id="use">
      <LeftBox>
        <Title>Seu ritual diário</Title>

        <List>
          <li>Para levar em qualquer lugar</li>
          <li>Prático e gostoso</li>
          <li>Auto cuidado com sabor</li>
          <li>Ideal para o life style moderno</li>
        </List>

        <MainButton
          maxW={350}
          onClick={() => {
            scroller.scrollTo('buy', defaultScrollProps)
          }}
          golden
        >
          QUERO GARANTIR AGORA
        </MainButton>

        <BearImage
          src="https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/bearHTU.png?alt=media&token=c5258e74-dad0-4395-9862-7593044dc469"
          alt="gummy"
        />
      </LeftBox>

      <VideoBox>
        <video
          ref={videoRef}
          src="https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/howToUse.mp4?alt=media&token=68125583-25d5-4aa8-8010-9a0a03bc3c6e"
          controls
          preload="auto"
          playsInline
        />
      </VideoBox>
    </Wrapper>
  )
}
