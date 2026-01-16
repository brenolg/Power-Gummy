import React, { useState, useEffect } from 'react'
import {
  Wrapper,
  Row,
  Input,
  ApplyButton,
  Chips,
  Chip,
  Icon,
  RemoveButton,
  InputError,
} from './styles'
import couponIcon from '@/assets/icons/couponIcon.svg'
import xGolden from '@/assets/icons/xGolden.svg'
import { useCoreData } from '@/context/coreDataContext'
import { useFetch } from '@/hooks/useFetch'
import imgError from '@/assets/icons/error.svg'
import LoadingBtn from '@/components/LoadingBtn'

type Coupon = {
  code: string
  discount: number // % de desconto
}

interface DiscountCouponsProps {
  onChange?: (coupons: Coupon[]) => void
}

export const DiscountCoupons: React.FC<DiscountCouponsProps> = ({ onChange }) => {
  const { paymentMethod, coupons, setCoupons, formStep } = useCoreData()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { fetcher } = useFetch()

  const PIX_COUPON: Coupon = { code: 'PIX05', discount: 5 }

  // Adiciona/remover cupom PIX automaticamente
  useEffect(() => {
    if (paymentMethod === 'PIX') {
      const exists = coupons.some((c) => c.code === PIX_COUPON.code)
      if (!exists) {
        const updated = [...coupons, PIX_COUPON]
        setCoupons(updated)
        onChange?.(updated)
      }
    } else {
      const updated = coupons.filter((c) => c.code !== PIX_COUPON.code)
      if (updated.length !== coupons.length) {
        setCoupons(updated)
        onChange?.(updated)
      }
    }
  }, [paymentMethod])

  async function handleApply() {
    setError('')
    if (loading) return

    const normalized = code.trim().toUpperCase()

    // evita duplicados
    if (coupons.some((c) => c.code === normalized)) {
      setCode('')
      return
    }

    try {
      setLoading(true)

      // resp vem do backend: { code: string, percent: number }
      const resp = await fetcher<{ code: string; percent: number }>(
        '/public/validate-coupon',
        'POST',
        { body: { code: code } }
      )

      if (!resp) return

      const { code: serverCode, percent } = resp

      const newCoupon: Coupon = {
        code: serverCode, // código validado pelo back
        discount: percent, // percent
      }

      const updated = [...coupons, newCoupon]
      setCoupons(updated)
      onChange?.(updated)
      setCode('')
    } catch (err) {
      console.error('Erro ao validar cupom:', err)
      setError('Nenhum cupom correspondente foi encontrado.')
    } finally {
      setLoading(false)
    }
  }

  function handleRemove(code: string) {
    //Impede a deleção do cupom pix
    if (code === 'PIX05') return
    const updated = coupons.filter((c) => c.code !== code)
    setCoupons(updated)
    onChange?.(updated)
  }

  const nonPixCoupons = coupons.filter((c) => c.code !== 'PIX05')
  const maxNormalCouponsReached = nonPixCoupons.length >= 1
  return (
    <Wrapper>
      {typeof formStep === 'number' && (
        <Row>
          <Input
            placeholder="Código de desconto"
            value={code}
            onFocus={() => setError('')}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApply())}
          />

          <ApplyButton disabled={maxNormalCouponsReached} onClick={handleApply}>
            {loading ? <LoadingBtn /> : 'Aplicar'}
          </ApplyButton>
          <InputError $error={!!error}>
            <img src={imgError} className="img-error" /> {error}
          </InputError>
        </Row>
      )}

      {coupons.length > 0 && (
        <Chips>
          {coupons.map((c) => (
            <Chip key={c.code}>
              <Icon src={couponIcon} />
              <span>{c.code}</span>
              <RemoveButton onClick={() => handleRemove(c.code)}>
                <img src={xGolden} />
              </RemoveButton>
            </Chip>
          ))}
        </Chips>
      )}
    </Wrapper>
  )
}
