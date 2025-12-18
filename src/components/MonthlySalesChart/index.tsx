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

export default function MonthlySalesChart({ data }: any) {
  if (!data?.monthlyData) return null

  const productNames: any[] = Array.from(
    new Set(data.monthlyData.flatMap((m: any) => m.products.map((p: any) => p.name)))
  )

  const chartData: any[] = MONTHS.map((month: any, index: any) => {
    const m: any = data.monthlyData[index]
    const row: any = { month }

    productNames.forEach((name: any) => {
      const p = m?.products?.find((x: any) => x.name === name)
      row[name] = p ? p.revenue : 0
    })

    return row
  })

  const maxValue = Math.max(...chartData.flatMap((m: any) => productNames.map((n: any) => m[n])))

  const STEP_VALUE: any = 2000
  const GRID_STEPS: any = Math.ceil(maxValue / STEP_VALUE)
  const MIN_STEPS: any = 5
  const totalSteps: any = Math.max(GRID_STEPS, MIN_STEPS)

  const monthlyTotals: any[] = chartData.map((m: any) =>
    productNames.reduce((acc: any, name: any) => acc + (m[name] || 0), 0)
  )

  return (
    <ChartBox>
      <ChartLayout>
        <YAxisContainer>
          {Array.from({ length: totalSteps + 1 }).map((_: any, i: any) => {
            const v: any = STEP_VALUE * (totalSteps - i)
            return <div key={i}>{v >= 1000 ? `${v / 1000}k` : v}</div>
          })}
        </YAxisContainer>

        <ChartScrollArea>
          <ChartInner>
            {Array.from({ length: totalSteps + 1 }).map((_: any, i: any) => (
              <GridLine key={i} style={{ top: (CHART_HEIGHT / totalSteps) * i }} />
            ))}

            <BarsWrapper>
              {chartData.map((m: any, idx: any) => (
                <MonthColumn key={idx}>
                  <MonthBars>
                    {productNames.map((name: any, colorIdx: any) => {
                      const v: any = m[name] || 0
                      const height: any = (v / (STEP_VALUE * totalSteps)) * CHART_HEIGHT

                      return (
                        <BarWrapper key={colorIdx}>
                          <div style={{ height: `${height}px` }}>
                            <Bar
                              style={{
                                background: COLORS[colorIdx],
                                height: '100%',
                              }}
                            />
                          </div>
                        </BarWrapper>
                      )
                    })}
                  </MonthBars>
                </MonthColumn>
              ))}
            </BarsWrapper>
          </ChartInner>

          <LabelsRow>
            {chartData.map((m: any, idx: any) => (
              <MonthColumn key={idx}>
                <MonthLabel>{m.month}</MonthLabel>

                <TotalAbove>{monthlyTotals[idx] > 0 ? fmtBRL(monthlyTotals[idx]) : '-'}</TotalAbove>

                <ValuesBelow>
                  {productNames.map((name: any, ci: any) => {
                    const value: any = m[name]

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
