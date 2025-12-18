import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    109deg,
    var(--roxo-700, #502665) 1.58%,
    var(--Roxo-500, #7d37a1) 97.6%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Card = styled.form`
  width: 100%;
  max-width: 352px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Logo = styled.img`
  width: 173px;
  height: 120px;
  aspect-ratio: 173/120;
  margin-bottom: 30px;
`

export const Title = styled.p`
  color: var(--Color-Neutral-White-0, #fff);
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 30px;
`

export const FormContainer = styled.div`
  padding: 0 16.5px;
  justify-content: center;
  width: 100%;
`

export const Input = styled.input`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  outline: none;
  margin-bottom: 24px;
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #ffffff;
  border-radius: 5px;

  background-color: transparent !important;
  background: transparent !important;
  &::placeholder {
    color: #ffffff;
  }
  /* Remove fundo automático do browser */
  -webkit-appearance: none;
  appearance: none;

  /* Força transparente até no autofill */
  &:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: #fff !important;
    transition: background-color 9999s ease-in-out 0s;
  }

  /* Focus */
  &:focus {
    background-color: transparent !important;
    outline: none;
  }
  border: 1px solid #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
  padding-left: 16px;
`

export const Button = styled.button`
  display: flex;
  height: 54px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--dourado-200, #ba7e1b) 0%,
    var(--Dourado-300, #5b4112) 100%
  );
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  color: #fff;
  font-family: 'Nunito Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  width: 100%;
`

export const ForgotPassword = styled.a`
  color: rgba(250, 228, 193, 0.8);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  text-align: center;
  width: 100%;
  opacity: 0;
  pointer-events: none;

  text-align: center;
  display: block;
  margin: auto;
  margin-top: 16px;
  cursor: pointer;
`
