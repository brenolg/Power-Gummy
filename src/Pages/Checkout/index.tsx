import { MainContainer } from './styles'
import CheckoutFormPanel from './CheckoutFormPanel'
import OrderSummaryPanel from './OrderSummaryPanel'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCoreData } from '@/context/coreDataContext'
import { useFetch } from '@/hooks/useFetch'
import PageLoading from '@/components/PageLoading'

export default function Checkout() {
  const location = useLocation()
  const { setFormStep, setFormData, setCoupons, setFormPostalCode, setCart } = useCoreData()
  const params = new URLSearchParams(location.search)
  const id = params.get('id')

  useEffect(() => {
    // sempre que mudar de página:
    setCoupons([])
    setFormData({})
    setFormStep(0)
  }, [location.pathname])

  const { fetcher } = useFetch()
  const [loading, setLoading] = useState(!!id)

  useEffect(() => {
    if (!id) return

    async function load() {
      try {
        const data = await fetcher<any>(`/public/recovery-cart/${id}`, 'GET')
        if (data.coupon) {
          const raw = Array.isArray(data.coupon) ? data.coupon : [data.coupon]

          const normalized = raw.map((c: any) => ({
            code: c.code,
            discount: c.discountValue ?? c.discount ?? 0, // 🔥 converte discountValue → discount
          }))

          setCoupons(normalized)
        }
        if (data.cartItems) {
          setCart(data.cartItems)
        }
        setFormStep(0)
        if (data.email) {
          setFormData({
            email: data.email,
            phone: data.phone,
            name: data.name,
          })
          setFormStep(1)
        }
        if (data.address) {
          setFormData((prev) => ({
            ...prev,
            email: data.email,
            phone: data.phone,
            name: data.name,
            postalCode: data.address.cep,
            street: data.address.street,
            district: data.address.neighborhood,
            addressComplement: data.address.addressComplement,
            number: data.address.number,
            city: data.address.city,
            state: data.address.state,
          }))

          setFormPostalCode(data.address.cep)
          setFormStep(2)
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) {
    return <PageLoading />
  }

  return (
    <MainContainer>
      <CheckoutFormPanel />
      <OrderSummaryPanel />
    </MainContainer>
  )
}
