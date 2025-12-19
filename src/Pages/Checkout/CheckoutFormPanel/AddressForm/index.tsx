import { MainButton, MInput } from '@/components'
import { InputContainer, TwoInputContainer } from '../styles'
import { FormTitle } from '../styles'
import { useCoreData } from '@/context/coreDataContext'

import { FormProvider, useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { Warning } from './styles'
import { useFetch } from '@/hooks/useFetch'
import { useEffect } from 'react'

export type CheckoutFormData = {
  postalCode: string
  address: string
  district: string
  addressComplement: string
  addressNumber: string
  city: string
  state: string
}

export default function AddressForm() {
  const { setFormPostalCode, setFormData, formData, coupons, setFormStep, cart } = useCoreData()
  const { fetcher } = useFetch()

  const methods = useForm<CheckoutFormData>({
    resolver: yupResolver(schema) as Resolver<CheckoutFormData>,
    defaultValues: {
      postalCode: '',
      address: '',
      district: '',
      addressComplement: '',
      addressNumber: '',
      city: '',
      state: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const handleStep = async () => {
    const isValid = await methods.trigger() // valida todos os campos

    if (!isValid) {
      return // impede avanço
    }

    const data = methods.getValues()

    const minimalCart = cart.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }))

    const coupom = coupons[0]
    if (formData.advertisement) {
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
          cep: data.postalCode,
          street: data.address,
          number: data.addressNumber,
          neighborhood: data.district,
          city: data.city,
          state: data.state,
          addressComplement: data.addressComplement,
        },
        cartItems: minimalCart,
      }

      fetcher('/public/capture-lead', 'POST', { body })
    }

    setFormData((prev) => ({
      ...prev,
      ...data,
    }))

    setFormStep(2)
  }

  const handleCepBlur = async () => {
    const postalCode = methods.getValues('postalCode')
    if (!postalCode) return

    // se você está usando máscara "99999-999", aqui ainda vem com hífen
    const cleanCEP = postalCode.replace(/\D/g, '')

    // só chama API se tiver 8 dígitos
    if (cleanCEP.length !== 8) return

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
      const data = await res.json()

      if (data.erro) {
        methods.setError('postalCode', {
          type: 'manual',
          message: 'CEP não encontrado. Verifique e tente novamente.',
        })
        return
      }

      methods.clearErrors('postalCode')

      setFormPostalCode(postalCode)
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      methods.setError('postalCode', {
        type: 'manual',
        message: 'CEP não encontrado. Verifique e tente novamente.',
      })
    }
  }

  const cep = methods.watch('postalCode')

  useEffect(() => {
    const cleanCEP = cep?.replace(/\D/g, '')

    if (!cleanCEP || cleanCEP.length !== 8) return

    const fetchAddress = async () => {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
        const data = await res.json()

        if (data.erro) {
          methods.setError('postalCode', {
            type: 'manual',
            message: 'CEP não encontrado. Verifique e tente novamente.',
          })
          return
        }

        methods.clearErrors('postalCode')
        methods.setValue('address', data.logradouro || '')
        methods.setValue('district', data.bairro || '')
        methods.setValue('addressComplement', data.complemento || '')
        methods.setValue('city', data.localidade || '')
        methods.setValue('state', data.uf || '')

        setFormPostalCode(cep)
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        methods.setError('postalCode', {
          type: 'manual',
          message: 'Erro ao buscar CEP. Tente novamente.',
        })
      }
    }

    fetchAddress()
  }, [cep])

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
          <FormTitle>Endereço</FormTitle>
          <MInput
            name="postalCode"
            type="cep"
            placeholder="CEP"
            hasAsterisk
            mb={24}
            onBlur={handleCepBlur}
          />
          <MInput name="address" type="text" placeholder="Endereço" hasAsterisk mb={26} />
          <MInput name="district" type="text" placeholder="Bairro" hasAsterisk mb={26} />
          <TwoInputContainer>
            <MInput name="addressComplement" type="text" placeholder="Complemento" hasAsterisk />
            <MInput name="addressNumber" type="text" placeholder="Número" hasAsterisk mb={26} />
          </TwoInputContainer>
          <TwoInputContainer>
            <MInput name="city" disabled type="text" placeholder="Cidade" mb={26} />
            <MInput name="state" disabled type="text" placeholder="Estado" />
          </TwoInputContainer>
        </InputContainer>

        <Warning>
          ⚠️ Certifique-se de que o endereço está completo e correto para garantir a entrega do seu
          pedido.
        </Warning>

        <MainButton type="submit" onClick={handleStep}>
          Avançar
        </MainButton>
      </form>
    </FormProvider>
  )
}
