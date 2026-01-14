import { formatDateBR, formatDateBRMinutes } from '@/utils/helper'

import {
  Container,
  HeaderBox,
  HeaderLeft,
  Title,
  CodeMuted,
  TrackingCode,
  NewSearchButton,
  HistoryTitle,
  Timeline,
  Item,
  IconDot,
  ItemContent,
  ItemTitle,
  ItemDate,
  ItemDescription,
  Card,
} from './styles'
import check from '@/assets/icons/checkC.svg'

export type TrackingEvent = {
  title: string
  date: string
  description: string
}

type Props = {
  trackingCode: string
  events: any[] // depois eu tipamos melhor se quiser
  currentStatus: string
  estimatedDeliveryDate: string
  setTrackStatus: React.Dispatch<React.SetStateAction<number>>
}
import plus from '@/assets/icons/plus.svg'

export default function TrackingDetails({
  trackingCode,
  events,
  setTrackStatus,
  currentStatus,
  estimatedDeliveryDate,
}: Props) {
  return (
    <Container>
      <HeaderBox>
        <HeaderLeft>
          <Title>Dados do rastreio</Title>
          <CodeMuted>Código de rastreamento — AWB</CodeMuted>
          <TrackingCode style={{ marginBottom: '8px' }}>{trackingCode}</TrackingCode>
          <CodeMuted>Previsão de entrega</CodeMuted>
          {estimatedDeliveryDate ? formatDateBR(estimatedDeliveryDate) : '-'}
          <CodeMuted>Status atual</CodeMuted>
          <TrackingCode>{`${currentStatus}`}</TrackingCode>
        </HeaderLeft>

        <NewSearchButton
          onClick={() => {
            setTrackStatus(0)
          }}
        >
          <img src={plus} /> Nova consulta
        </NewSearchButton>
      </HeaderBox>

      <Card>
        <HistoryTitle>Histórico da entrega</HistoryTitle>

        <Timeline>
          {events.map((ev, i) => (
            <Item key={i}>
              <IconDot>
                <img src={check} />
              </IconDot>
              <ItemContent>
                <ItemTitle>{ev.title}</ItemTitle>
                <ItemDate>{formatDateBRMinutes(ev.date)}</ItemDate>
                <ItemDescription>{ev.status}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </Timeline>
      </Card>
    </Container>
  )
}
