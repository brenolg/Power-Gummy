import PageLoading from '@/components/PageLoading'
import { useFetch } from '@/hooks/useFetch'
import { useEffect, useState } from 'react'
import { Container, Icon, Input, TableContainer, Title } from './styles'
import glass from '@/assets/icons/glassP.svg'
import Table from '@/components/Table'
import LeadRow from './LeadRow'
import { useMemo } from 'react'
import { useCoreData } from '@/context/coreDataContext'
import AuthModal from '@/components/AuthModal'

export default function Clients() {
  const { fetcher } = useFetch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { setShowAuth } = useCoreData()

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetcher('/admin/leads', 'GET')

        const pixCoupon = { code: 'PIX05', discountValue: 5 }

        // Normaliza os dados
        const normalized = (res as any[]).map((item) => {
          let couponArray: any[] = []

          // 1 — transforma em array
          if (Array.isArray(item.coupon)) {
            couponArray = item.coupon
          } else if (item.coupon) {
            couponArray = [item.coupon]
          }

          // 2 — adiciona cupom PIX se necessário
          if (item.paymentMethod === 'PIX') {
            // evita duplicar cupom PIX caso o backend já envie
            const existsPix = couponArray.some((c) => c.code === 'PIX05')
            if (!existsPix) {
              couponArray.push(pixCoupon)
            }
          }

          return {
            ...item,
            coupon: couponArray,
          }
        })
        console.log(normalized)
        setData(normalized)
      } catch (error) {
        console.error('Erro ao carregar leads:', error)
        setShowAuth(true) // 👈 AQUI
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [fetcher])

  const filteredData = useMemo(() => {
    if (!search.trim()) return data

    const value = search.trim().toLowerCase()

    return data.filter((item) => {
      // 1 — filtra por nome
      const nameMatch = item.name?.toLowerCase().includes(value)

      // 2 — filtra por cidade
      const cityMatch = item.address?.city?.toLowerCase().includes(value)

      // 3 — filtra por estado
      const stateMatch = item.address?.state?.toLowerCase().includes(value)

      // 4 — filtra por cupom (array)
      const couponMatch = item.coupon?.some((c: any) => c.code.toLowerCase().includes(value))

      return nameMatch || cityMatch || stateMatch || couponMatch
    })
  }, [search, data])

  const header = [
    '#',
    'Quando',
    'cliente',
    'Contato',
    'Localização',
    'produto',
    'etapa do funil',
    'cupom',
    'Valor',
    'status DO pedido',
  ]

  function tableRows(data: any) {
    if (!data) return []

    return data.map((item: any, i: number) => <LeadRow key={item.id} item={item} index={i} />)
  }

  const pageSize = 10
  return loading ? (
    <PageLoading />
  ) : (
    <div>
      <Title>Gestão de Leads X Venda</Title>
      <Container>
        <Icon src={glass} />
        <Input
          placeholder="Pesquisar cliente, localização ou cupom"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>

      <TableContainer>
        <Table
          width={1238}
          header={header}
          key={JSON.stringify(filteredData)}
          page={page}
          columnsWidths={[40, 152, 160, 90, 120, 130, 130, 80, 110, 210]}
          setPage={setPage}
          filterData={filteredData}
          pageData={tableRows(filteredData.slice((page - 1) * pageSize, page * pageSize))}
          rowHight={72}
        />
      </TableContainer>

      <AuthModal />
    </div>
  )
}
