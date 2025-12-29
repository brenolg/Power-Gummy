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
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1

    if (video.paused || video.ended) {
      video.play()
      setShowThumb(false)
    } else {
      video.pause()
      video.currentTime = 0
      setShowThumb(true)
    }
  }

  // 🔥 força render do primeiro frame no iOS
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause() // 👈 ESSENCIAL
          video.currentTime = 0
        })
        .catch(() => {})
    }
  }, [])

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
      <Video ref={videoRef} src={videoUrl} preload="auto" muted playsInline />

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
