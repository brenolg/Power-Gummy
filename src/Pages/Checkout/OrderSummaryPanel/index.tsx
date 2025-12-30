import { PageTitle, ProductContainer } from '../styles'
import { ProductCartItem } from './ProductCartItem'
import { CartContainer, EmptyContainer, MobileSummary } from './styles'
import { DiscountCoupons } from './DiscountCoupons'
import { useCoreData } from '@/context/coreDataContext'
import OrderSummary from './OrderSummary'
import emptyBag from '@/assets/icons/emptyBag.svg'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../CheckoutFormPanel/styles'
import backArow from '@/assets/icons/backArow.svg'
import { useState } from 'react'
import chevron from '@/assets/icons/chevron-down.svg'

export default function OrderSummaryPanel() {
  const { cart } = useCoreData()
  const [openMobileSummary, setOpenMobileSummary] = useState(false)

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0)

  const isMobile = useMediaQuery({
    query: '(max-width: 740px)',
  })
  const { formStep } = useCoreData()
  const navigate = useNavigate()

  return (
    <>
      {!isMobile && (
        <>
          {cartCount === 0 ? (
            <EmptyContainer>
              <img src={emptyBag} />
              <p className="text">Seu carrinho está vazio.</p>
            </EmptyContainer>
          ) : (
            <ProductContainer>
              {!isMobile && <PageTitle $mb={48}>Resumo do pedido</PageTitle>}

              <CartContainer className="cart">
                {cart.map((item) => (
                  <ProductCartItem
                    key={item.productId}
                    productId={item.productId}
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    quantity={item.quantity}
                    unitPrice={item.unitPrice}
                  />
                ))}
              </CartContainer>

              <DiscountCoupons />
              <OrderSummary />
            </ProductContainer>
          )}
        </>
      )}

      {isMobile && (
        <div>
          {(typeof formStep === 'number' || formStep === 'qrcode') && (
            <BackButton onClick={() => navigate('/')}>
              <img src={backArow} />
              <PageTitle>Finalizar Compra</PageTitle>
            </BackButton>
          )}

          <div
            onClick={() => setOpenMobileSummary(!openMobileSummary)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              maxWidth: 450,
              margin: 'auto',
              marginBottom: 24,
              padding: 24,
              paddingBottom: 0,
            }}
          >
            {/* TÍTULO + CHEVRON */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  color: '#502665',
                  fontFamily: 'Nunito Sans',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Resumo do pedido
              </span>

              <img
                src={chevron}
                style={{
                  width: 18,
                  height: 18,
                  transform: openMobileSummary ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease',
                }}
              />
            </div>

            {/* PREÇO À DIREITA */}
            <span
              style={{
                color: '#502665',
                fontFamily: 'Nunito Sans',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              R$ {cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)}
            </span>
          </div>

          {/* Conteúdo interno */}
          <MobileSummary $open={openMobileSummary}>
            <div style={{ marginTop: 20, maxWidth: 420, margin: 'auto', padding: 24 }}>
              <CartContainer className="cart">
                {cart.map((item) => (
                  <ProductCartItem
                    key={item.productId}
                    productId={item.productId}
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    quantity={item.quantity}
                    unitPrice={item.unitPrice}
                  />
                ))}
              </CartContainer>

              <DiscountCoupons />

              <OrderSummary />
            </div>
          </MobileSummary>
        </div>
      )}
    </>
  )
}
