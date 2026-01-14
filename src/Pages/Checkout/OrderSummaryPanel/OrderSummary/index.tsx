// OrderSummary.tsx
import { useEffect, useMemo } from 'react'
import { useCoreData, type ShippingResponse } from '@/context/coreDataContext'
import { useFetch } from '@/hooks/useFetch'
import { handleNumberOfBoxes, handleProductWeight } from './helper'
import { fmtBRL } from '@/utils/helper'
import { Box, DiscountValue, Label, Row, TotalLabel, TotalRow, TotalValue } from './styles'

type Props = {
  /** Como combinar vários cupons: "sum" (soma %) ou "sequential" (aplica em cascata) */
  couponMode?: 'sum' | 'sequential'
}

export default function OrderSummary({ couponMode = 'sum' }: Props) {
  const {
    cart,
    coupons,
    formPostalCode,
    shipping,
    setShipping,
    setGlobalLoading,
    juros,
    setFormData,
  } = useCoreData()

  const { fetcher } = useFetch()

  const { itemsCount, subtotal, couponsPct, couponsAmount, interestAmount, total } = useMemo(() => {
    const itemsCount = cart.reduce((acc, i) => acc + (i.quantity || 0), 0)

    const subtotal = cart.reduce((acc, i) => acc + i.unitPrice * (i.quantity || 0), 0)

    // % total de desconto via cupons
    let couponsPct = 0

    if (couponMode === 'sum') {
      couponsPct = Math.min(
        100,
        coupons.reduce((acc, c) => acc + (c.discount || 0), 0)
      )
    } else {
      // aplica em cascata (mais realista em e-commerce)
      let running = subtotal
      coupons.forEach((c) => {
        running -= running * (c.discount / 100)
      })
      couponsPct = subtotal > 0 ? (1 - running / subtotal) * 100 : 0
    }

    // valor absoluto de desconto
    const couponsAmount = +(subtotal * (couponsPct / 100)).toFixed(2)

    // total dos produtos já com cupom aplicado (sem frete)
    const totalBeforeShipping = Math.max(0, subtotal - couponsAmount)

    // frete (0 quando não definido)
    const shippingValue = shipping?.valor ?? 0

    // 🧮 total base que é parcelado: produtos - cupom + frete
    const baseTotal = totalBeforeShipping + shippingValue

    // 🔥 juros vindo do contexto (ex.: 4.5)
    const jurosPct = juros || 0
    const jurosFactor = jurosPct / 100

    // 💸 juros em R$ calculado sobre o total parcelado (baseTotal)
    const interestAmount = +(baseTotal * jurosFactor).toFixed(2)

    // total final: base + juros
    const fixedFee = jurosPct > 0 ? 0.49 : 0

    const total = +(baseTotal + interestAmount + fixedFee).toFixed(2)

    return {
      itemsCount,
      subtotal: +subtotal.toFixed(2),
      couponsPct: +couponsPct.toFixed(2),
      couponsAmount,
      interestAmount,
      total,
    }
  }, [cart, coupons, couponMode, shipping, juros])

  useEffect(() => {
    if (!total) return

    setFormData((prev) => ({
      ...prev,
      total,
    }))
  }, [total, setFormData])

  async function calcularFrete() {
    if (subtotal > 199 && (formPostalCode.startsWith('8') || formPostalCode.startsWith('9'))) {
      setShipping({ valor: 0, prazo: 0 })
      return
    }

    try {
      setGlobalLoading(true)

      const BOX_DATA = {
        peso: 0.92,
        altura: 14,
        largura: 19,
        profundidade: 10,
      }

      const numberOfBoxes = handleNumberOfBoxes(cart)
      const pesoProdutos = handleProductWeight(cart)

      const pesoCaixas = BOX_DATA.peso * numberOfBoxes

      const body = {
        cep: formPostalCode,
        subtotal: subtotal,
        peso: Number((pesoCaixas + pesoProdutos).toFixed(2)),
      }
      console.log('Body Frete', body)

      const resp = await fetcher<ShippingResponse>('public/calculate-shipping', 'POST', { body })

      if (!resp || !resp.frete) {
        console.warn('Resposta inesperada do servidor:', resp)
        setShipping(null)
        return
      }

      setShipping(resp.frete)
    } catch (error) {
      console.error('Erro ao calcular frete:', error)
      setShipping(null)
    } finally {
      setGlobalLoading(false)
    }
  }

  useEffect(() => {
    calcularFrete()
  }, [formPostalCode, cart]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Row>
        <Label>
          Subtotal · {itemsCount} {itemsCount === 1 ? 'item' : 'itens'}
        </Label>
        <Label>{fmtBRL(subtotal)}</Label>
      </Row>

      {coupons.length > 0 ? (
        <Row>
          <Label>Cupom de desconto aplicado</Label>
          <DiscountValue>
            -{fmtBRL(couponsAmount)} <small>({couponsPct}%)</small>
          </DiscountValue>
        </Row>
      ) : null}

      <Row>
        <Label>Frete</Label>

        {shipping == null ? (
          <DiscountValue>Digite o CEP para calcular</DiscountValue>
        ) : (
          <DiscountValue>{shipping.valor === 0 ? 'Grátis' : fmtBRL(shipping.valor)}</DiscountValue>
        )}
      </Row>

      {juros > 0 && (
        <Row>
          <Label>Juros ({fmtBRL(juros)}%) + taxa R$(0,49)</Label>
          <DiscountValue>+{fmtBRL(interestAmount + 0.49)}</DiscountValue>
        </Row>
      )}

      <TotalRow>
        <TotalLabel>Total</TotalLabel>
        <TotalValue>{fmtBRL(total)}</TotalValue>
      </TotalRow>
    </Box>
  )
}
