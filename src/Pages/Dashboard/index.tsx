import PageLoading from '@/components/PageLoading'
import { useFetch } from '@/hooks/useFetch'
import { useEffect, useState } from 'react'
import { FlexContainer, Title } from './styles'
import user from '@/assets/icons/user.svg'
import cart from '@/assets/icons/cartPurple.svg'
import StatCard from '@/components/StatCard'
import money from '@/assets/icons/money.svg'
import { fmtBRL } from '@/utils/helper'
import { Divider } from '@/components'
import MonthlySalesChart from '@/components/MonthlySalesChart'

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

export default function Dashboard() {
  const { fetcher } = useFetch()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetcher(`/admin/dashboard`, 'GET')
        console.log(res)
        setData(res)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [fetcher])

  return loading ? (
    <PageLoading />
  ) : (
    <div>
      <Title>Total de Vendas</Title>
      <FlexContainer>
        <StatCard icon={user} value={data.uniqueCustomersCount} label="Qtd de Clientes" />
        <StatCard icon={cart} value={data.totalSalesCount} label="Qtd de potes vendidoss" />
        <StatCard icon={money} value={fmtBRL(data.totalRevenue)} label="Faturamento total" purple />
      </FlexContainer>
      <Divider mb={33} />
      <FlexContainer>
        <Title>Vendas por Mês</Title>
      </FlexContainer>
      <MonthlySalesChart data={data} />
    </div>
  )
}
