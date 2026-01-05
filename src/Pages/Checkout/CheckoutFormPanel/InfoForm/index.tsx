import { MInput, Checkbox, MainButton } from '@/components'
import { InputContainer } from '../styles'
import { FormTitle } from '../styles'
import { FormProvider, useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { useCoreData } from '@/context/coreDataContext'
import { useFetch } from '@/hooks/useFetch'

export type CheckoutFormData = {
  name: string
  email: string
  phone: string
  advertisement: boolean
}

export default function InfoForm() {
  const { setFormStep, setFormData, coupons, formData, cart } = useCoreData()
  const { fetcher } = useFetch()

  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(schema) as Resolver<CheckoutFormData>,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      advertisement: true,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const handleStep = async () => {
    console.log(cart)
    const isValid = await methods.trigger() // valida todos os campos
    if (!isValid) {
      console.error('Form inválido')
      return // impede avanço
    }

    const data = methods.getValues()

    const minimalCart = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))

    const coupom = await coupons[0]

    const body = {
      email: data.email,
      phone: data.phone,
      name: data.name,
      total: formData.total,
      cartItems: minimalCart,
      ...(coupom && {
        coupon: {
          code: coupom.code,
          discountValue: coupom.discount,
        },
      }),
    }

    const x = await fetcher('/public/capture-lead', 'POST', { body })
    console.log('LEAD', x, body)

    setFormData(data)
    setFormStep(1)
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
          <FormTitle>Contato</FormTitle>
          <MInput name="name" type="text" placeholder="Nome" hasAsterisk mb={26} />
          <MInput name="email" type="nospace" placeholder="Email" hasAsterisk mb={26} />
          <MInput name="phone" type="phone" placeholder="Celular" hasAsterisk mb={26} />
          <Checkbox name="advertisement" label="Enviar novidades e promoções" />
        </InputContainer>

        <MainButton type="submit">Avançar</MainButton>
      </form>
    </FormProvider>
  )
}
