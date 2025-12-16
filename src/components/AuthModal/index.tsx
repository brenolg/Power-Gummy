// Cupons.tsx
import { Container, Title, Warning } from './styles'
import { Divider, MainButton } from '@/components'
import Modal from '@/components/Modal'

import warning from '@/assets/icons/warning.svg'
import { useCoreData } from '@/context/coreDataContext'
import { useNavigate } from 'react-router-dom'

export default function AuthModal() {
  const { showAuth, setShowAuth } = useCoreData()
  const navigate = useNavigate()

  function handleLoginAgain() {
    setShowAuth(false)
    navigate('/admin')
  }

  return (
    <Modal open={showAuth} onClose={() => setShowAuth(false)} maxWidth="754px">
      <Container>
        <Title>Sua sessão expirou</Title>
        <Warning>
          <img src={warning} />
          Sessão encerrada por inatividade
        </Warning>

        <p>Por segurança, sua sessão foi encerrada. </p>
        <p>Faça login novamente para continuar.</p>

        <Divider />

        <MainButton onClick={handleLoginAgain}>Entrar novamente</MainButton>
      </Container>
    </Modal>
  )
}
