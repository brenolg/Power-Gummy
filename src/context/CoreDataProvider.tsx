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

  const CART_KEY = 'powergummy.cart'

  // Minimal → armazenado no localStorage
  const [cartStorage, setCartStorage] = useState<MinimalCartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      const parsed = stored ? JSON.parse(stored) : []

      // 🔥 Garantir que SEMPRE volte um array
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  // Cart completo (usado internamente)
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (!cartStorage.length) return []
    return cartStorage
      .map((item) => {
        const base = CartItemsData.find((p) => p.productId === item.productId)
        if (!base) return null
        return { ...base, quantity: item.quantity }
      })
      .filter(Boolean) as CartItem[]
  })

  // 🚀 Rehidrata cart toda vez que cartStorage muda
  useEffect(() => {
    const full = cartStorage
      .map((item) => {
        const base = CartItemsData.find((p) => p.productId === item.productId)
        if (!base) return null
        return { ...base, quantity: item.quantity }
      })
      .filter(Boolean) as CartItem[]

    setCart(full)
  }, [cartStorage])

  // 💾 Salva no localStorage SEM criar loop
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartStorage))
    } catch {
      console.log('x')
    }
  }, [cartStorage])

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
        cartStorage,
        setCartStorage, // ← use SEMPRE esse para manipular carrinho
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
