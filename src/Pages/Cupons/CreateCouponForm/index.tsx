import { FormProvider, useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Divider, MInput, MainButton } from '@/components'
import {
  InputContainer,
  TwoInputContainer,
  FormTitle,
  FormSubtitle,
  BtnContainer,
  MessageContainer,
} from './styles'
import { useFetch } from '@/hooks/useFetch'
import { useState, type Dispatch, type SetStateAction } from 'react'
import type { Coupon } from '../index'

export type CreateCouponFormData = {
  code: string
  discount: number | null
  influencer?: string
}

type ApiResponse<T = any> = {
  status?: number
  error?: string
  message?: string
  payload?: T
}
/* -------------------------
  VALIDAÇÃO
--------------------------*/
const schema = yup.object({
  code: yup.string().required('Código é obrigatório'),
  discount: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const normalized = originalValue.replace(',', '.')
        return Number(normalized)
      }
      return value
    })
    .typeError('Informe um valor válido')
    .required('Desconto obrigatório')
    .positive('O valor precisa ser positivo')
    .max(99, 'O desconto não pode ser maior que 99%'),
  influencer: yup.string().optional(),
})

type CreateCouponFormProps = {
  setData: Dispatch<SetStateAction<Coupon[]>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateCouponForm({ setData, setOpen }: CreateCouponFormProps) {
  const { fetcher } = useFetch()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const methods = useForm<CreateCouponFormData>({
    resolver: yupResolver(schema) as Resolver<CreateCouponFormData>,
    defaultValues: {
      code: '',
      discount: null,
      influencer: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const handleSubmitCoupon = async (data: CreateCouponFormData) => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      const body = {
        code: data.code.trim(),
        percent: Number(data.discount),
        influencer: data.influencer?.trim(),
      }

      const res = (await fetcher('/admin/coupon', 'POST', { body })) as ApiResponse

      if (!res || res.error) {
        throw new Error(res?.message || 'Erro ao criar cupom')
      }

      const newCoupon = {
        id: data.code,
        code: data.code,
        percent: data.discount ?? 0,
        active: true,
        influencer: data.influencer || '',
        createdAt: {
          _seconds: Math.floor(Date.now() / 1000),
          _nanoseconds: 0,
        },
      }
      setSuccess('Cupom criado com sucesso!')

      setData((prev) => [newCoupon, ...prev])
      setOpen(false)
      methods.reset()
    } catch (err: unknown) {
      let backendMessage = 'Erro inesperado.'

      if (typeof err === 'object' && err !== null) {
        if ('payload' in err && typeof (err as any).payload === 'object') {
          backendMessage = (err as any).payload?.error || backendMessage
        }
        if ('message' in err) {
          backendMessage = String((err as any).message)
        }
      }

      setError(backendMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitCoupon)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
      >
        <InputContainer>
          <FormTitle>Criar novo cupom</FormTitle>

          {/* ------------------
              INFORMAÇÕES DO CUPOM
          ------------------*/}
          <FormSubtitle>Informações do cupom</FormSubtitle>

          <TwoInputContainer>
            <MInput name="code" type="text" placeholder="Código do cupom" hasAsterisk mb={24} />

            <MInput
              name="discount"
              type="numberCents"
              placeholder="Valor do desconto"
              hasAsterisk
              mb={24}
            />
          </TwoInputContainer>

          {/* ------------------
              INFLUENCER
          ------------------*/}
          <FormSubtitle>Contexto</FormSubtitle>
          <TwoInputContainer>
            <MInput name="influencer" type="text" placeholder="Nome completo" />
          </TwoInputContainer>

          {(error || success) && (
            <MessageContainer $error={!!error}>{error || success}</MessageContainer>
          )}
        </InputContainer>
        <Divider mb={0} />
        <BtnContainer>
          <MainButton maxW={180} type="submit" font={14} height={50} loading={loading}>
            Criar cupom
          </MainButton>
        </BtnContainer>
      </form>
    </FormProvider>
  )
}
