import { useEffect, useState } from 'react'
import {
  Wrapper,
  Card,
  Title,
  SubTitle,
  InputGroup,
  Input,
  CheckLine,
  SubmitButton,
  InputError,
  Form,
} from './styles'
import logo from '@/assets/imgs/logo.png'
import check from '@/assets/icons/check.svg'
import arow from '@/assets/icons/arowLeft.svg'
import glass from '@/assets/icons/magnifyingGlass.svg'
import imgError from '@/assets/icons/error.svg'
import LoadingBtn from '@/components/LoadingBtn'
import { useFetch } from '@/hooks/useFetch'
import { useSearchParams } from 'react-router-dom'

type TrackFormProps = {
  setTrackStatus: React.Dispatch<React.SetStateAction<number>>
  setTrackData: React.Dispatch<React.SetStateAction<any>>
}

export default function TrackForm({ setTrackStatus, setTrackData }: TrackFormProps) {
  const [awb, setAwb] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const { fetcher } = useFetch()

  useEffect(() => {
    const awbFromUrl = searchParams.get('awb')
    if (awbFromUrl) setAwb(awbFromUrl)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // evita reload da página
    setError('')

    if (!awb.trim()) {
      setError('Digite o código de rastreio.')
      return
    }

    try {
      setLoading(true)
      const body = {
        awb: awb,
      }
      console.log(body)
      const res: any = await fetcher('/public/track-order', 'POST', { body })

      // ✅ Se quiser validar resposta:
      if (!res || res.error) {
        throw new Error(res?.message || 'Pedido não encontrado.')
      }
      console.log(res)
      setTrackData(res)
      setTrackStatus(1)
    } catch (err: any) {
      console.error(err)

      setError(err?.message || 'Erro ao consultar pedido. Verifique o código e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Wrapper>
        {/* FORM PARA ACEITAR ENTER */}
        <Card>
          <Form onSubmit={handleSubmit}>
            <img className="logo" src={logo} />

            <Title>Rastrear Pedido</Title>
            <SubTitle>Acompanhe seu pedido de forma simples e rápida</SubTitle>

            <InputGroup>
              <label>ID do Pedido</label>

              <Input
                value={awb}
                onChange={(e) => setAwb(e.target.value)}
                placeholder="Digite o código de rastreio"
              />
            </InputGroup>

            <CheckLine>
              <img src={check} />
              <span>Digite o ID completo do pedido</span>
              <InputError $error={!!error}>
                <img src={imgError} className="img-error" /> {error}
              </InputError>
            </CheckLine>

            {/* Botão type="submit" ativa Enter */}
            <SubmitButton>
              {loading ? (
                <LoadingBtn />
              ) : (
                <>
                  <img src={glass} />
                  Consultar Pedido
                  <img src={arow} />
                </>
              )}
            </SubmitButton>
          </Form>
        </Card>
      </Wrapper>
    </>
  )
}
