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
  device: BannerDevice
  context: string
}

export default function Cupons() {
  const { fetcher } = useFetch()
  const { setShowAuth } = useCoreData()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Banner[]>([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  type DeviceType = 'mobile' | 'desktop'

  function detectDeviceByAspectRatio(width: number, height: number): DeviceType {
    const ratio = width / height

    if (ratio < 1) return 'mobile' // vertical
    if (ratio >= 1.3) return 'desktop' // horizontal

    return 'desktop'
  }

  function getImageDevice(imageUrl: string): Promise<DeviceType> {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = imageUrl

      img.onload = () => {
        resolve(detectDeviceByAspectRatio(img.width, img.height))
      }

      img.onerror = () => {
        resolve('desktop') // fallback seguro
      }
    })
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)

        const res = (await fetcher('/admin/banners', 'GET')) as Banner[]

        const enriched = await Promise.all(
          res.map(async (item) => {
            const device = await getImageDevice(item.imageUrl)

            return {
              ...item,
              device, // 👈 chave adicionada aqui
            }
          })
        )
        console.log(enriched)
        setData(enriched)
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

  // PATCH /admin/coupon/{COUPON_ID}
  async function handleEditCoupon(edited: Banner) {
    try {
      const body = {
        active: edited.active,
        context: edited.context ?? '',
        position: edited.position,
        // ✅ sempre manda string
      }
      //,
      console.log('PATCH id:', edited.id)
      console.log('BODY PATCH', body)

      await fetcher(`/admin/banner/${edited.id}`, 'PATCH', { body })

      setData((prev) =>
        prev.map((coupon) => (coupon.id === edited.id ? { ...coupon, ...edited } : coupon))
      )
    } catch (err: any) {
      console.error('Erro ao atualizar cupom', err.status)
      if (err.status === 401) {
        setShowAuth(true)
        return
      }
      alert(err)
    }
  }

  async function handleDeleteCoupon(item: Banner) {
    try {
      console.log('DELETE id:', item.id)

      await fetcher(`/admin/banner/${item.id}`, 'DELETE')

      // remove da tela após sucesso
      setData((prev) => prev.filter((coupon) => coupon.id !== item.id))
    } catch (err: any) {
      console.error('Erro ao excluir cupom', err)
      if (err.status === 401) {
        setShowAuth(true)
        return
      }
      alert(err)
    }
  }

  function tableRows(coupons: Banner[]) {
    if (!coupons) return []

    return coupons.map((item, i) => (
      <BannersRow
        key={item.id}
        item={item}
        index={i}
        onEdit={handleEditCoupon}
        onDelete={handleDeleteCoupon}
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
            .filter((item) => item.active && item.device === 'desktop')
            .sort((a, b) => a.position - b.position)
            .map((item) => (
              <img key={item.id} src={item.imageUrl} alt={`Banner ${item.position}`} />
            ))}
        </BannersContainer>
      </TableContainer>

      <TableTitle>Banners cadastrados</TableTitle>

      <TableContainer>
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
        <BannerForm />
      </Modal>

      <AuthModal />
    </div>
  )
}
