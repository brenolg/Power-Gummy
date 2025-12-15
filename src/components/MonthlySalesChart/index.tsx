import { fmtBRL } from '@/utils/helper'
import {
  ChartBox,
  ChartLayout,
  YAxisContainer,
  ChartScrollArea,
  ChartInner,
  GridLine,
  BarsWrapper,
  MonthColumn,
  MonthBars,
  Bar,
  LabelsRow,
  ValuesBelow,
  MonthLabel,
  BarWrapper,
  TotalAbove,
} from './styles'

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const COLORS = ['#B07A24', '#4B2377']
const CHART_HEIGHT = 220

export default function MonthlySalesChart({ data }) {
  if (!data?.monthlyData) return null

  const productNames = Array.from(
    new Set(data.monthlyData.flatMap((m) => m.products.map((p) => p.name)))
  )

  const chartData = MONTHS.map((month, index) => {
    const m = data.monthlyData[index]
    const row: any = { month }

    productNames.forEach((name) => {
      const p = m?.products?.find((x) => x.name === name)
      row[name] = p ? p.revenue : 0
    })

    return row
  })

  const maxValue = Math.max(...chartData.flatMap((m) => productNames.map((n) => m[n])))

  const STEP_VALUE = 2000
  const GRID_STEPS = Math.ceil(maxValue / STEP_VALUE)
  const MIN_STEPS = 5
  const totalSteps = Math.max(GRID_STEPS, MIN_STEPS)

  const monthlyTotals = chartData.map((m) =>
    productNames.reduce((acc, name) => acc + (m[name] || 0), 0)
  )

  return (
    <ChartBox>
      <ChartLayout>
        <YAxisContainer>
          {Array.from({ length: totalSteps + 1 }).map((_, i) => {
            const v = STEP_VALUE * (totalSteps - i)
            return <div key={i}>{v >= 1000 ? `${v / 1000}k` : v}</div>
          })}
        </YAxisContainer>

        <ChartScrollArea>
          <ChartInner>
            {Array.from({ length: totalSteps + 1 }).map((_, i) => (
              <GridLine key={i} style={{ top: (CHART_HEIGHT / totalSteps) * i }} />
            ))}

            {/* ÚNICO GRÁFICO */}
            <BarsWrapper>
              {chartData.map((m, idx) => (
                <MonthColumn key={idx}>
                  <MonthBars>
                    {productNames.map((name, colorIdx) => {
                      const v = m[name] || 0
                      const height = (v / (STEP_VALUE * totalSteps)) * CHART_HEIGHT

                      return (
                        <BarWrapper key={colorIdx}>
                          <div style={{ height: `${height}px` }}>
                            <Bar style={{ background: COLORS[colorIdx], height: '100%' }} />
                          </div>
                        </BarWrapper>
                      )
                    })}
                  </MonthBars>
                </MonthColumn>
              ))}
            </BarsWrapper>
          </ChartInner>

          {/* LABELS + SOMA (sem barras duplicadas) */}
          <LabelsRow>
            {chartData.map((m, idx) => (
              <MonthColumn key={idx}>
                <MonthLabel>{m.month}</MonthLabel>
                <TotalAbove>{monthlyTotals[idx] > 0 ? fmtBRL(monthlyTotals[idx]) : '-'}</TotalAbove>

                <ValuesBelow>
                  {productNames.map((name, ci) => {
                    const value = m[name]

                    return (
                      <div key={ci} style={{ color: COLORS[ci] }}>
                        {value > 0 ? fmtBRL(value) : '-'}
                      </div>
                    )
                  })}
                </ValuesBelow>
              </MonthColumn>
            ))}
          </LabelsRow>
        </ChartScrollArea>
      </ChartLayout>
    </ChartBox>
  )
}
