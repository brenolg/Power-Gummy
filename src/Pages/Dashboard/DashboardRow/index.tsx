import { fmtBRL } from '@/utils/helper'
import { ImageContainer, Images, ProductContainer, Dot } from './styles'

type LeadRowProps = {
  item: any
  index: number
  totalRevenue: number
}
type ProductId = 'powergum-kit-3' | 'powergummy-1'
const productImages: Record<ProductId, string> = {
  'powergum-kit-3':
    'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/trioGummy.png?alt=media&token=e6923e9e-0c14-4a45-8214-d444442ada88',

  'powergummy-1':
    'https://firebasestorage.googleapis.com/v0/b/powergummy-prod.firebasestorage.app/o/EmbalagemFrente.png?alt=media&token=56f24118-8c1c-4d48-b3d8-db7b69db0a09',
}
export default function DashboardRow({ item, index, totalRevenue }: LeadRowProps) {
  const image = productImages[item.productId as ProductId]
  const isGold = item.productId === 'powergummy-1'

  const revenue = item.revenue ?? 0
  const percentage = totalRevenue ? Math.round((revenue / totalRevenue) * 100) : 0

  return [
    <div key={`index-${index}`} className="grid-index">
      <Dot $golden={!isGold} />
    </div>,

    <div key={`name-${index}`} className="grid-item">
      <ProductContainer>
        {isGold ? '1 Pote power gummy' : 'Kit Trio Power Gummy'}
        <Images>
          <ImageContainer $img={image} $isGold={!isGold} />
        </Images>
      </ProductContainer>
    </div>,

    <div key={`qty-${index}`} className={`grid-item ${!isGold ? 'golden' : 'purple'}`}>
      {item.quantitySold}
    </div>,

    <div key={`percent-${index}`} className={`grid-item ${!isGold ? 'golden' : 'purple'}`}>
      {percentage}%
    </div>,

    <div key={`revenue-${index}`} className={`grid-item ${!isGold ? 'golden' : 'purple'}`}>
      {fmtBRL(revenue)}
    </div>,
  ]
}
