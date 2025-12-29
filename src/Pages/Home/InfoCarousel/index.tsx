import { Item, Bar, Scroller, Content } from './styles'
import gummyBear from '@/assets/icons/gummyBear.svg'
import discountPurple from '@/assets/icons/discountPurple.svg'
import creditCardPurple from '@/assets/icons/creditCardPurple.svg'
import sugarFree from '@/assets/icons/sugarFree.svg'
import glutenFree from '@/assets/icons/glutenFree.svg'
import dairyFree from '@/assets/icons/dairyFree.svg'
import calories from '@/assets/icons/calories.svg'
import freeShipping from '@/assets/icons/freeShipping.svg'

const itens = [
  {
    icon: freeShipping,
    lightText: 'REGIÃO SUL ACIMA DE R$199,00',
    firstStrongText: 'FRETE GRÁTIS',
  },
  { icon: discountPurple, lightText: '', strongText: '5% de desconto no PIX' },
  { icon: creditCardPurple, lightText: 'em até ', strongText: '3x sem juros' },
  { icon: sugarFree, lightText: '', strongText: 'SEM AÇÚCAR' },
  { icon: glutenFree, lightText: '', strongText: 'SEM GLÚTEN' },
  { icon: dairyFree, lightText: '', strongText: 'SEM LACTOSE' },
  { icon: calories, lightText: '', strongText: 'BAIXA EM CALORIAS' },
  { icon: gummyBear, lightText: 'FORMATO DE ', strongText: 'GUMMY' },
]

export default function InfoCarousel() {
  return (
    <Bar>
      <Scroller>
        <Content>
          {itens.map((it, i) => (
            <Item key={`a-${i}`}>
              <img src={it.icon} alt="" />
              <p className="text">
                <span>{it.firstStrongText}</span> <span className="light">{it.lightText}</span>
                {'  '}
                <span>{it.strongText}</span>
              </p>
            </Item>
          ))}
        </Content>

        {/* cópia 2: idêntica à primeira */}
        <Content aria-hidden>
          {itens.map((it, i) => (
            <Item key={`b-${i}`}>
              <img src={it.icon} alt="" />
              <p className="text">
                <span>{it.firstStrongText}</span> <span className="light">{it.lightText}</span>
                {'  '}
                <span>{it.strongText}</span>
              </p>
            </Item>
          ))}
        </Content>
      </Scroller>
    </Bar>
  )
}
