import { useRef, useState } from 'react'
import { BtnWraper, CardsWrapper, Subtitle, Title } from './styles'
import VideoCard from './VideoCard'
import BeforeAfterCard from './BeforeAfterCard'
import { MainButton } from '@/components'
import { useMediaQuery } from 'react-responsive'
import { scroller } from 'react-scroll'
import defaultScrollProps from '@/utils/defaultScrollProps'

type DepVideo = {
  isVideo: true
  videoUrl: string
  text: string
}

type DepBeforeAfter = {
  isVideo: false
  before: string
  after: string
  label: string
  time: string
}

type Depoimento = DepVideo | DepBeforeAfter

const depoimentos: Depoimento[] = [
  {
    isVideo: false,
    before:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/bef1.png?alt=media&token=9984cc7a-3e87-4555-92d3-a85b0d9d81b8',
    after:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/after1.png?alt=media&token=3df2fa4b-b328-4e24-b782-7817dd8d6d23',
    label: 'Unhas mais resistentes',
    time: '2 meses',
  },
  {
    isVideo: true,
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/test1.mp4?alt=media&token=1c408299-5b61-46b9-99ea-69881844ac2a',
    text: 'É um composto vitamínico bem completo e muito prático de tomar',
  },
  {
    isVideo: false,
    before:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/bef3.png?alt=media&token=2b93d88f-930b-4709-98ff-3333242cf951',
    after:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/after3.png?alt=media&token=87179d9f-7c56-48b8-8f79-59a4b6198e6a',
    label: 'Cabelos Fortes',
    time: '3 meses',
  },

  {
    isVideo: true,
    videoUrl:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/test2.mp4?alt=media&token=f11c4134-dccc-4c5e-99c4-70019ca5bef0',
    text: 'Eu tinha muita queda de cabelo e nada resolvia',
  },
  {
    isVideo: false,
    before:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/bef2.png?alt=media&token=36503031-1b10-4029-b3a1-4ecfa674808b',
    after:
      'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/after2.png?alt=media&token=4cb88c40-88ce-461b-84d2-c6ff591ec732',
    label: 'Unhas mais resistentes',
    time: '2 meses',
  },
]

export default function Transformations() {
  const [lockCarousel, setLockCarousel] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return
    if (lockCarousel) return
    setIsDragging(true)
    const slider = sliderRef.current
    startXRef.current = e.pageX - slider.offsetLeft
    scrollLeftRef.current = slider.scrollLeft
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lockCarousel) return
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const slider = sliderRef.current
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startXRef.current) * 1.2 // velocidade
    slider.scrollLeft = scrollLeftRef.current - walk
  }

  // touch (mobile) – opcional, mas deixa a experiência consistente
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (lockCarousel) return
    if (!sliderRef.current) return
    setIsDragging(true)
    const slider = sliderRef.current
    const touch = e.touches[0]
    startXRef.current = touch.pageX - slider.offsetLeft
    scrollLeftRef.current = slider.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (lockCarousel) return
    if (!isDragging || !sliderRef.current) return
    const slider = sliderRef.current
    const touch = e.touches[0]
    const x = touch.pageX - slider.offsetLeft
    const walk = (x - startXRef.current) * 1.2
    slider.scrollLeft = scrollLeftRef.current - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  return (
    <>
      <Title>Trasformações</Title>
      <Subtitle>falam mais que palavras</Subtitle>

      <CardsWrapper
        ref={sliderRef}
        $isDragging={isDragging}
        onMouseDown={handleMouseDown}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {depoimentos.map((dep, i) =>
          dep.isVideo ? (
            <VideoCard key={i} text={dep.text} videoUrl={dep.videoUrl} />
          ) : (
            <BeforeAfterCard
              key={i}
              beforeSrc={dep.before}
              afterSrc={dep.after}
              title={dep.label}
              timeText={dep.time}
              onDragCompareStart={() => setLockCarousel(true)}
              onDragCompareEnd={() => setLockCarousel(false)}
            />
          )
        )}
      </CardsWrapper>
      <BtnWraper>
        <MainButton
          maxW={659}
          onClick={() => {
            scroller.scrollTo('buy', defaultScrollProps)
          }}
        >
          {isMobile ? 'COMECE JÁ SUA MUDANÇA' : 'GARANTIR MEU TRATAMENTO HOJE'}
        </MainButton>
      </BtnWraper>
    </>
  )
}
