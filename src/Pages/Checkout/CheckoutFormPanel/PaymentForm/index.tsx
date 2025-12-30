import { useCoreData } from '@/context/coreDataContext'
import { Divider, MInput, Select, MainButton } from '@/components'
import PaymentMethodSelector from '../PaymentMethodSelector'
import { InputContainer, TwoInputContainer, FormTitle } from '../styles'
import { FormProvider, useForm, useWatch, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, schemaPix } from './schema'
import { useFetch } from '@/hooks/useFetch'
import { onlyDigits } from '@/utils/helper'
import { useEffect, useState } from 'react'
import { InputError } from './styles'
import imgError from '@/assets/icons/error.svg'

export type CheckoutFormData = {
  cardNumber?: string
  expiry?: string // MM/AA
  cvv?: string // 3–4 dígitos
  holderName?: string
  installments?: number
  cpf: string
}

export default function PaymentCardForm() {
  const [error, setError] = useState('')
  const { fetcher } = useFetch()

  const {
    paymentMethod,
    formData,
    setFormStep,
    setFormData,
    globalLoading,
    coupons,
    shipping,
    setGlobalLoading,
    setJuros,
    cart,
  } = useCoreData()

  const installmentsOptions = [
    { label: `1x sem juros`, value: 1 },
    { label: '2x sem juros', value: 2 },
    { label: '3x sem juros', value: 3 },
    { label: '4x com juros', value: 4 },
    { label: '5x com juros', value: 5 },
    { label: '6x com juros', value: 6 },
    { label: '7x com juros', value: 7 },
    { label: '8x com juros', value: 8 },
    { label: '9x com juros', value: 9 },
    { label: '10x com juros', value: 10 },
    { label: '11x com juros', value: 11 },
    { label: '12x com juros', value: 12 },
  ]

  const methods = useForm<CheckoutFormData>({
    resolver:
      paymentMethod === 'CREDIT_CARD'
        ? (yupResolver(schema) as Resolver<CheckoutFormData>)
        : (yupResolver(schemaPix) as Resolver<CheckoutFormData>), // <-- desliga toda validação quando for PIX
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      installments: 0,
      cpf: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  //Seta o juros com parcelas acima de 3
  const { control } = methods
  const installments = useWatch({
    control,
    name: 'installments',
  })

  useEffect(() => {
    // sempre zera se for PIX
    if (paymentMethod === 'PIX') {
      setJuros(0)
      return
    }
    // se não houver parcelas ainda, não faz nada
    if (!installments) return

    if (installments <= 3) {
      setJuros(0)
    } else if (installments >= 4 && installments <= 6) {
      setJuros(3.49)
    } else if (installments >= 7 && installments <= 12) {
      setJuros(3.99)
    }
  }, [installments, paymentMethod])

  const handleStep = async () => {
    console.log(coupons)
    if (globalLoading) return

    const isValid = await methods.trigger() // valida só no cartão

    if (!isValid) {
      console.error('Form inválido')
      return
    }

    const data = methods.getValues()
    try {
      setGlobalLoading(true)
      setError('')
      const filteredCoupons = coupons.filter((c) => c.code !== 'PIX05')
      const minimalCart = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      let month = ''
      let year4 = ''

      if (paymentMethod === 'CREDIT_CARD' && data.expiry) {
        const [m, y] = data.expiry.split('/')
        month = m
        year4 = `20${y}`
      }

      const body = {
        customerData: {
          name: formData.name,
          email: formData.email,
          cpf: onlyDigits(data.cpf),
          phone: onlyDigits(String(formData.phone)),
          postalCode: formData.postalCode,
          addressNumber: formData.addressNumber,
          addressComplement: formData.addressComplement,
          city: formData.city,
          street: formData.address,
          state: formData.state,
          neighborhood: formData.district,
        },
        ...(filteredCoupons.length > 0 && {
          coupon: filteredCoupons[0].code,
        }),

        items: await minimalCart,

        shipping: shipping?.valor,
        paymentMethod: paymentMethod,
        ...(paymentMethod === 'CREDIT_CARD' && {
          creditCard: {
            holderName: data.holderName?.toLocaleUpperCase(),
            number: onlyDigits(data.cardNumber),
            expiryMonth: month,
            expiryYear: year4,
            ccv: data.cvv,
          },
          creditCardHolderInfo: {
            name: formData.name,
            email: formData.email,
            cpfCnpj: onlyDigits(data.cpf),
            phone: onlyDigits(String(formData.phone)),
            postalCode: formData.postalCode,
            addressNumber: formData.addressNumber,
            addressComplement: formData.addressComplement,
            city: formData.city,
            street: formData.address,
            state: formData.state,
            neighborhood: formData.district,
          },
          installmentCount: data.installments,
          installmentValue: Number((Number(formData.total) / Number(data.installments)).toFixed(2)),
        }),
      }

      console.log('body create order', body)
      const res: any = await fetcher('/public/create-order', 'POST', { body })

      if (formData.advertisement) {
        const coupom = coupons.find((c) => !c.code.startsWith('PIX'))
        const body = {
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          total: formData.total,
          ...(coupom && {
            coupon: {
              code: coupom.code,
              discountValue: coupom.discount,
            },
          }),
          address: {
            cep: formData.postalCode,
            street: formData.address,
            number: formData.addressNumber,
            neighborhood: formData.district,
            city: formData.city,
            state: formData.state,
            addressComplement: formData.addressComplement,
          },
          document: data.cpf,
          cartItems: minimalCart,
          paymentMethod: paymentMethod,
        }

        const x = await fetcher('/public/capture-lead', 'POST', { body })
        console.log('lead payform', x)
      }

      if (paymentMethod === 'PIX') {
        setFormData((prev) => ({
          ...prev,
          ...data,
          qrcodePayload: res.paymentData.payload,
          qrcodeImage: res.paymentData.encodedImage,
        }))

        setFormStep('qrcode')
        return
      }
    } catch (error: any) {
      console.error('Erro ao criar pedido:', error)

      // tenta extrair mensagem do backend
      const backendMessage =
        error?.response?.data?.error || error?.response?.data?.message || error?.message

      setError(backendMessage || 'Erro inesperado ao processar o pedido.')

      setTimeout(() => {
        setError('')
      }, 5000)
      return
    } finally {
      setGlobalLoading(false)
    }

    //Salva os dados
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))

    if (paymentMethod === 'CREDIT_CARD') {
      setFormStep('success')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        id="checkout-form"
        onSubmit={methods.handleSubmit(handleStep)} // <-- CERTO
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
          }
        }}
      >
        <InputContainer>
          <FormTitle>Pagamento</FormTitle>
          <PaymentMethodSelector />
          <Divider mb={24} />

          {paymentMethod === 'CREDIT_CARD' ? (
            <>
              <MInput
                name="cardNumber"
                type="card"
                placeholder="Número do Cartão"
                hasAsterisk
                mb={24}
              />
              <MInput name="cpf" type="cpf" placeholder="CPF" hasAsterisk mb={26} />
              <TwoInputContainer>
                <MInput name="expiry" type="expiry" placeholder="Validade" hasAsterisk mb={26} />
                <MInput name="cvv" type="cvv" placeholder="CVV" hasAsterisk mb={26} />
              </TwoInputContainer>
              <MInput
                name="holderName"
                type="text"
                placeholder="Nome do titular do Cartão"
                hasAsterisk
                mb={26}
              />
              <Select
                name="installments"
                placeholder="Parcelas"
                options={installmentsOptions}
                hasAsterisk
              />
            </>
          ) : (
            <>
              <MInput name="cpf" type="cpf" placeholder="CPF" hasAsterisk mb={26} />
              <div className="pix-description">
                Clique no botão de “Confirmar pagamento” para visualizar o QR Code de pagamento
              </div>
            </>
          )}
          <InputError $error={!!error}>
            <img src={imgError} className="img-error" /> {error}
          </InputError>
        </InputContainer>

        <MainButton type="submit" loading={globalLoading}>
          Confirmar Pagamento
        </MainButton>
      </form>
    </FormProvider>
  )
}
