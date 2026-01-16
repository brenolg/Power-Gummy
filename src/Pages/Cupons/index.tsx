// Cupons.tsx
import { Btn, Subtitle, TableContainer, Title } from './Styles'
import plus from '@/assets/icons/plus.svg'
import { Divider } from '@/components'
import Modal from '@/components/Modal'
import PageLoading from '@/components/PageLoading'
import { useFetch } from '@/hooks/useFetch'
import { useEffect, useState } from 'react'
import CreateCouponForm from './CreateCouponForm'
import Table from '@/components/Table'
import CouponRow from './CouponRow'
import AuthModal from '@/components/AuthModal'
import { useCoreData } from '@/context/coreDataContext'

export type Coupon = {
  id: string
  code: string
  percent: number
  active: boolean
  influencer?: string
  createdAt: {
    _seconds: number
  }
  usageCount?: number
}

export default function Cupons() {
  const { fetcher } = useFetch()
  const { setShowAuth } = useCoreData()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Coupon[]>([])
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = (await fetcher('/admin/coupons', 'GET')) as Coupon[]
        setData(res)
      } catch (error) {
        console.error('Erro ao carregar Coupons:', error)
        setShowAuth(true) // 👈 AQUI
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [fetcher])

  const pageSize = 10
  const pageData = data.slice((page - 1) * pageSize, page * pageSize)

  const header = [
    '#',
    'QUANDO FOI CRIADO',
    'Código do cupom',
    'desconto',
    'Usados',
    'contexto',
    'status',
    'ação',
  ]

  // PATCH /admin/coupon/{COUPON_ID}
  async function handleEditCoupon(edited: Coupon) {
    try {
      const body = {
        active: edited.active,
        code: edited.code,
        percent: edited.percent,
        influencer: edited.influencer ?? '', // ✅ sempre manda string
      }

      await fetcher(`/admin/coupon/${edited.id}`, 'PATCH', { body })

      setData((prev) =>
        prev.map((coupon) => (coupon.id === edited.id ? { ...coupon, ...edited } : coupon))
      )
    } catch (err) {
      console.error('Erro ao atualizar cupom', err)
      setShowAuth(true)
    }
  }

  async function handleDeleteCoupon(item: Coupon) {
    try {
      await fetcher(`/admin/coupons/${item.id}`, 'DELETE')

      // remove da tela após sucesso
      setData((prev) => prev.filter((coupon) => coupon.id !== item.id))
    } catch (err) {
      console.error('Erro ao excluir cupom', err)
      setShowAuth(true)
    }
  }

  function tableRows(coupons: Coupon[]) {
    if (!coupons) return []

    return coupons.map((item, i) => (
      <CouponRow
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
      <Title>Gestão de Cupons</Title>
      <Btn onClick={() => setOpen(true)}>
        <img src={plus} alt="Adicionar" /> Novo Cupom
      </Btn>
      <Divider mb={24} />
      <Subtitle>Cupons cadastrados</Subtitle>

      <TableContainer>
        <Table
          width={1238}
          header={header}
          key={JSON.stringify(data)}
          page={page}
          columnsWidths={[40, 220, 200, 160, 140, 220, 140, 110]}
          setPage={setPage}
          filterData={data}
          pageData={tableRows(pageData)}
        />
      </TableContainer>

      <Modal open={open} onClose={() => setOpen(false)} maxWidth="754px">
        <CreateCouponForm setData={setData} setOpen={setOpen} />
      </Modal>

      <AuthModal />
    </div>
  )
}
