import styled from 'styled-components'

export const ChartBox = styled.div`
  padding: 24px;
  width: 1238px;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  border: 1px solid #f8f9fa;
  background: #fff;
  box-shadow: 0 4px 20px 0 rgba(238, 238, 238, 0.5);
`

export const ChartLayout = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
`

export const YAxisContainer = styled.div`
  position: absolute;
  top: 12px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 236px;
  font-size: 12px;

  color: var(--Grey-400, #a3a3a3);

  /* xs/Regular */
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
`

export const ChartScrollArea = styled.div`
  flex: 1;
  overflow-x: auto;
`

/* Apenas GRID + BARRAS ficam aqui */
export const ChartInner = styled.div`
  position: relative;
  height: 220px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

export const GridLine = styled.div`
  position: absolute;
  left: 30px;
  right: 0;
  height: 1px;
  background: #eee;
  z-index: 1;
`

export const BarsWrapper = styled.div`
  display: flex;
  height: 100%;
  gap: 14px;
  padding: 0 16px;
  z-index: 2;
`

export const MonthColumn = styled.div`
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MonthBars = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: 100%;
`

export const Bar = styled.div`
  width: 12px;
  border-radius: 2px 2px 0 0;
  position: relative;
  z-index: 2;
`

/* AGORA FORA DO GRÁFICO */
export const LabelsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  padding: 8px 16px 0;
`

export const ValuesBelow = styled.div`
  color: var(--roxo-700, #502665);
  text-align: center;
  font-family: 'Nunito Sans';
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 160% */
`

export const MonthLabel = styled.div`
  font-size: 12px;
  color: #a3a3a3;
  text-align: center;
  margin-bottom: 8px;
`
export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 14px; /* mesma largura da Bar para alinhar */
  position: relative;
`

/* Label absoluta acima da barra */
export const ValueAbove = styled.div`
  position: absolute;
  bottom: calc(100% + 8px); /* 8px acima do topo da barra */
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  z-index: 3;

  /* estilo visual */
  font-family: 'Nunito Sans', sans-serif;
`
export const TotalAbove = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #999;
  white-space: nowrap;
  font-family: 'Nunito Sans', sans-serif;
`
