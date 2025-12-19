import { useEffect, useState, type ReactNode } from 'react'
import {
  CoreDataContext,
  type PaymentMethod,
  type CartItem,
  type Coupon,
  type FormStep,
  type MinimalCartItem,
  type ShippingResponse,
  type FormDataType,
} from './coreDataContext'
import { CartItemsData } from './data'

export default function CoreDataProvider({ children }: { children: ReactNode }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CREDIT_CARD')
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [formStep, setFormStep] = useState<FormStep>(0)
  const [formPostalCode, setFormPostalCode] = useState('')
  const [globalLoading, setGlobalLoading] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType)
  const [shipping, setShipping] = useState<ShippingResponse['frete'] | null>(null)
  const [juros, setJuros] = useState(0)
  const [openCart, setOpenCart] = useState(false)
  const [showAuth, setShowAuth] = useState(false)

  // Minimal → armazenado no localStorage
  const CART_KEY = 'powergummy.cart'

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      const parsed = stored ? JSON.parse(stored) : []

      if (!Array.isArray(parsed)) return []

      return parsed
        .map((item: MinimalCartItem) => {
          const base = CartItemsData.find((p) => p.productId === item.productId)
          if (!base) return null
          return { ...base, quantity: item.quantity }
        })
        .filter(Boolean) as CartItem[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    const minimal: MinimalCartItem[] = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))

    try {
      localStorage.setItem(CART_KEY, JSON.stringify(minimal))
    } catch {
      console.log('erro ao salvar carrinho')
    }
  }, [cart])

  return (
    <CoreDataContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        cart,
        setCart, // ← você usa raramente (ex: limpar carrinho inteiro)
        coupons,
        setCoupons,
        formStep,
        setFormStep,
        formPostalCode,
        setFormPostalCode,

        globalLoading,
        setGlobalLoading,
        formData,
        setFormData,
        shipping,
        setShipping,
        juros,
        setJuros,
        openCart,
        setOpenCart,
        showAuth,
        setShowAuth,
      }}
    >
      {children}
    </CoreDataContext.Provider>
  )
}
