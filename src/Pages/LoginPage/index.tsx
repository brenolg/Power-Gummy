import { Page, Card, Logo, Title, Input, Button, ForgotPassword, FormContainer } from './styles'

import logo from '@/assets/imgs/logo.png'
import lock from '@/assets/icons/lock.svg'
import { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import LoadingBtn from '@/components/LoadingBtn'
import { InputError } from '@/components/form/FormCommomStyle'
import imgError from '@/assets/icons/error.svg'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { fetcher } = useFetch()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Preencha email e senha.')
      return
    }

    try {
      setLoading(true)

      const body = {
        email: email.trim(),
        password,
      }

      const res: any = await fetcher('/public/admin/login', 'POST', { body })

      if (!res || res.error) {
        throw new Error(res?.message || 'Credenciais inválidas.')
      }

      // ✅ Salvar token se existir
      if (res.idToken) {
        localStorage.setItem('powergummy.token', res.idToken)
      }

      // ✅ Redirecionar depois do login
      navigate('/dashboard')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Erro ao realizar login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Card onSubmit={handleSubmit}>
        <Logo src={logo} alt="Power Gummy" />
        <Title>Acessar plataforma de administração</Title>

        <FormContainer>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: 'relative', width: '100%' }}>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />

            <img
              src={lock}
              alt="Mostrar senha"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                opacity: 0.7,
                cursor: 'pointer',
              }}
            />
            <InputError $error={!!error}>
              <img src={imgError} className="img-error" /> {error}
            </InputError>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <LoadingBtn /> : <span>Entrar</span>}
          </Button>

          <ForgotPassword>Esqueceu a senha?</ForgotPassword>
        </FormContainer>
      </Card>
    </Page>
  )
}
