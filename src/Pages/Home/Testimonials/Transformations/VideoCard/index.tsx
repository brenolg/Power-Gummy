import { useRef, useState, useEffect } from 'react'
import play from '@/assets/icons/play.svg'
import { Card, Overlay, PlayButton, PlayTriangle, Text, Video } from './styles'

type Props = {
  videoUrl: string
  text: string
}

export default function VideoCard({ videoUrl, text }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showThumb, setShowThumb] = useState(true)

  const handleClick = () => {
    if (!videoRef.current) return

    const video = videoRef.current

    // sempre garantir som ativo
    video.muted = false
    video.volume = 1

    if (video.paused || video.ended) {
      void video.play()
      setShowThumb(false)
    } else {
      video.pause()
      video.currentTime = 0
      setShowThumb(true)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setShowThumb(true)
      video.currentTime = 0
    }

    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <Card onClick={handleClick}>
      <Video ref={videoRef} src={videoUrl} preload="metadata" playsInline />

      {showThumb && (
        <>
          <Overlay />
          <PlayButton>
            <PlayTriangle src={play} />
          </PlayButton>
          <Text>“{text}”</Text>
        </>
      )}
    </Card>
  )
}
