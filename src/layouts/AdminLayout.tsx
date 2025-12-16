import { Outlet } from 'react-router-dom'
import SidebarMenu from '@/components/SidebarMenu'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Content = styled.main`
  flex: 1;
  margin-left: 90px; /* largura do sidebar */
  padding: 24px;
  padding-top: 56px;
  padding-left: 56px;
  background: #fdfdfd;
  max-width: calc(100vw - 100px);
`

export default function AdminLayout() {
  return (
    <Wrapper>
      <SidebarMenu />
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  )
}
