import InfoCarousel from './FeatureCarousel'
import {
  CareTxt,
  CenterWrapper,
  Container,
  HairTxt,
  HeaderText,
  PurposeTitle,
  ScienceText,
  SubText,
  TransformatioTxt,
  Hand,
} from './styles'
import check from '@/assets/icons/check-circleB.svg'
import power from '@/assets/icons/powerB.svg'
import { MainButton } from '@/components'
import defaultScrollProps from '@/utils/defaultScrollProps'
import { scroller } from 'react-scroll'

export default function BenefitsSection() {
  return (
    <Container id="beneficios">
      <HeaderText>
        <strong>Power Gummy</strong> é mais que um suplemento
      </HeaderText>

      <SubText>
        <strong>É Cuidado 3 em 1.</strong> Somos a evolução em gomas de beleza
      </SubText>

      <PurposeTitle>
        <img src={check} />
        Uma fórmula avançada, precisa e revolucionária
      </PurposeTitle>

      <ScienceText>
        Ingredientes puros e inteligentes para
        <strong>resultados rápidos, visíveis e consistentes</strong>
      </ScienceText>

      <InfoCarousel />

      <CenterWrapper>
        <TransformatioTxt>
          <img src={power} />
          Transformação visível em poucas semanas
        </TransformatioTxt>

        <CareTxt>PowerGummy: o cuidado que tira você da frustração e entrega resultado.</CareTxt>
        <HairTxt>Cabelo, pele e unhas do jeito que você sempre sonhou.</HairTxt>

        <MainButton
          maxW={579}
          onClick={() => {
            scroller.scrollTo('buy', defaultScrollProps)
          }}
        >
          COMECE JÁ SUA MUDANÇA
        </MainButton>
      </CenterWrapper>

      <Hand src="https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/hand.png?alt=media&token=43f6ff79-c1a3-464d-bce3-832bb2dd8544" />
    </Container>
  )
}
