import PageLoading from '@/components/PageLoading'
import { useFetch } from '@/hooks/useFetch'
import { useEffect, useState } from 'react'
import { FlexContainer, TableContainer, Title } from './styles'
import user from '@/assets/icons/user.svg'
import cart from '@/assets/icons/cartPurple.svg'
import StatCard from '@/components/StatCard'
import money from '@/assets/icons/money.svg'
import { fmtBRL } from '@/utils/helper'
import { Divider } from '@/components'
import MonthlySalesChart from '@/components/MonthlySalesChart'
import Table from '@/components/Table'
import LeadRow from './LeadRow'
import { useCoreData } from '@/context/coreDataContext'
import AuthModal from '@/components/AuthModal'
import YearSelect from '@/components/YearSelect'

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

const header = ['#', 'Produto', 'unidades vendidas', 'porcentagem', 'valor Faturado']

export default function Dashboard() {
  const { fetcher } = useFetch()
  const { setShowAuth } = useCoreData()
  const [loading, setLoading] = useState(true)
  const [secondLoading, setSecondLoading] = useState(false)
  const [data, setData] = useState<any>({
    topSellingProducts: [],
    monthlyData: [],
  })
  const [year, setYear] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetcher(`/admin/dashboard`, 'GET')
        console.log(res)
        setData(res as any)
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
        setShowAuth(true) // 👈 AQUI
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    async function load() {
      console.log(year)
      if (!year) return
      try {
        setSecondLoading(true)
        const res: any = await fetcher(`/admin/dashboard?year=${year}`, 'GET')
        console.log(res)
        setData((prev: any) => {
          if (!prev) return res

          return {
            ...prev,
            monthlyData: res.monthlyData,
          }
        })
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error)
        setShowAuth(true) // 👈 AQUI
      } finally {
        setSecondLoading(false)
      }
    }

    load()
  }, [year])

  function tableRows(list: any[]) {
    const totalRevenue = data.topSellingProducts.reduce(
      (sum: number, item: any) => sum + (item.revenue ?? 0),
      0
    )
    return list.map((item, i) => (
      <LeadRow
        key={item.productId}
        item={item}
        index={i}
        totalRevenue={totalRevenue} // 👈 aqui
      />
    ))
  }
  const pageSize = 10

  return loading ? (
    <PageLoading />
  ) : (
    <div>
      <Title>Total de Vendas</Title>
      <FlexContainer>
        <StatCard icon={user} value={data?.uniqueCustomersCount} label="Qtd de Clientes" />
        <StatCard icon={cart} value={data?.totalSalesCount} label="Qtd de potes vendidoss" />
        <StatCard
          icon={money}
          value={fmtBRL(data?.totalRevenue ?? 0)}
          label="Faturamento total"
          purple
        />
      </FlexContainer>
      <Divider mb={33} />
      <FlexContainer>
        <Title>Vendas por Mês</Title>
        <YearSelect value={year} onChange={(y) => setYear(y)} />
      </FlexContainer>

      {secondLoading ? (
        <PageLoading />
      ) : (
        <>
          <MonthlySalesChart data={data} />

          <Title style={{ marginTop: '24px' }}>Produtos vendidos</Title>
          <TableContainer>
            <Table
              width={1238}
              header={header}
              page={page}
              columnsWidths={[40, 300, 200, 160, 200]}
              setPage={setPage}
              filterData={data.topSellingProducts}
              pageData={tableRows(
                data.topSellingProducts.slice((page - 1) * pageSize, page * pageSize)
              )}
              rowHight={72}
            />
          </TableContainer>
        </>
      )}

      <AuthModal />
    </div>
  )
}
