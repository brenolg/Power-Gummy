// Cupons.tsx
import { BannersContainer, Btn, Subtitle, TableContainer, TableTitle, Title } from './styles'
import plus from '@/assets/icons/plus.svg'
import { Divider } from '@/components'
import Modal from '@/components/Modal'
import PageLoading from '@/components/PageLoading'
import { useFetch } from '@/hooks/useFetch'
import { useEffect, useState } from 'react'

import Table from '@/components/Table'
import BannersRow from './BannersRow'
import AuthModal from '@/components/AuthModal'
import { useCoreData } from '@/context/coreDataContext'
import BannerForm from './BannerForm'

export type BannerDevice = 'mobile' | 'desktop'

export type Banner = {
  id: string
  imageUrl: string
  createdAt: string
  active: boolean
  position: number
  platform: BannerDevice
  context: string
}

export default function Banners() {
  const { fetcher } = useFetch()
  const { setShowAuth } = useCoreData()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Banner[]>([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)

        const res = (await fetcher('/admin/banners', 'GET')) as Banner[]

        setData(res)
      } catch (error) {
        console.error('Erro ao carregar Banners:', error)
        setShowAuth(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const pageSize = 10
  const pageData = data.slice((page - 1) * pageSize, page * pageSize)

  const header = [
    '#',
    'QUANDO FOI CRIADO',
    'posição',
    'Formato',
    'Preview',
    'Contexto',
    'status',
    'ação',
  ]

  type BannerEditPayload = {
    id: string
    position?: number
    context?: string
    active?: boolean
  }
  // PATCH /admin/coupon/{COUPON_ID}
  async function handleEditBanner(payload: BannerEditPayload) {
    try {
      await fetcher(`/admin/banner/${payload.id}`, 'PATCH', { body: payload })

      setData((prev) =>
        prev.map((banner) => (banner.id === payload.id ? { ...banner, ...payload } : banner))
      )
    } catch (err: any) {
      console.error('Erro ao atualizar banner', err)
      if (err.status === 401) {
        setShowAuth(true)
        return
      }

      alert(err.payload.error)
    }
  }

  async function handleDeleteBanner(item: Banner) {
    try {
      await fetcher(`/admin/banner/${item.id}`, 'DELETE')

      // remove da tela após sucesso
      setData((prev) => prev.filter((coupon) => coupon.id !== item.id))
    } catch (err: any) {
      console.error('Erro ao excluir banner', err)
      if (err.status === 401) {
        setShowAuth(true)
        return
      }
      alert(err.payload.error)
    }
  }

  function tableRows(coupons: Banner[]) {
    if (!coupons) return []

    return coupons.map((item, i) => (
      <BannersRow
        key={item.id}
        item={item}
        index={i}
        onEdit={handleEditBanner}
        onDelete={handleDeleteBanner}
      />
    ))
  }

  return loading ? (
    <PageLoading />
  ) : (
    <div>
      <Title>Banner</Title>
      <Btn onClick={() => setOpen(true)}>
        <img src={plus} alt="Adicionar" /> Novo Banner
      </Btn>
      <Divider mb={24} />

      <Subtitle>Banner ativos</Subtitle>
      <TableContainer>
        <BannersContainer>
          {data
            .filter((item) => item.active && item.platform === 'desktop')
            .sort((a, b) => a.position - b.position)
            .map((item) => (
              <img key={item.id} src={item.imageUrl} alt={`Banner ${item.position}`} />
            ))}
        </BannersContainer>
      </TableContainer>

      <TableTitle>Banners cadastrados</TableTitle>

      <TableContainer style={{ paddingBottom: '90px' }}>
        <Table
          width={1238}
          header={header}
          key={JSON.stringify(data)}
          page={page}
          columnsWidths={[40, 220, 128, 144, 200, 200, 200, 110]}
          setPage={setPage}
          filterData={data}
          pageData={tableRows(pageData)}
          rowHight={56}
        />
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="890px">
        <BannerForm setData={setData} banners={data} setOpen={setOpen} />
      </Modal>

      <AuthModal />
    </div>
  )
}
