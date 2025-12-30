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
  const [cart, setCart] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false) // ✅ flag

  const safeGetItem = (key: string) => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  }

  const safeSetItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch {
      console.log()
    }
  }

  /* ===========================
    HIDRATAÇÃO DO CARRINHO
  ============================ */
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return

      const stored = safeGetItem(CART_KEY)
      const parsed = stored ? JSON.parse(stored) : []

      if (!Array.isArray(parsed)) {
        setHydrated(true)
        return
      }

      const hydratedCart = parsed
        .map((item: MinimalCartItem) => {
          const base = CartItemsData.find((p) => p.productId === item.productId)
          if (!base) return null
          return { ...base, quantity: item.quantity }
        })
        .filter((item): item is CartItem => item !== null)

      setCart(hydratedCart)
    } catch (err) {
      console.warn('Erro ao carregar carrinho', err)
    } finally {
      setHydrated(true)
    }
  }, [])

  /* ===========================
    PERSISTÊNCIA NO STORAGE
  ============================ */
  useEffect(() => {
    if (!hydrated) return

    if (cart.length === 0) {
      const alreadyStored = safeGetItem(CART_KEY)
      if (alreadyStored) return // ⛔ não apaga no mobile
    }

    const minimal = cart
      .filter((item) => item.quantity > 0)
      .map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

    safeSetItem(CART_KEY, JSON.stringify(minimal))
  }, [cart, hydrated])

  return (
    <CoreDataContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        cart,
        setCart,
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
