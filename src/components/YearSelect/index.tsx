import { useEffect, useRef, useState } from 'react'
import { Chevron, Dropdown, Trigger, Wrapper, Option } from './styles'
import chevron from '@/assets/icons/chevron-down.svg'

type YearSelectProps = {
  value?: number | null
  onChange: (year: number) => void
}

export default function YearSelect({ value, onChange }: YearSelectProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <Wrapper ref={ref}>
      <Trigger onClick={() => setOpen((prev) => !prev)}>
        {value ?? currentYear}
        <Chevron open={open} src={chevron}></Chevron>
      </Trigger>

      {open && (
        <Dropdown>
          {years.map((year) => (
            <Option
              key={year}
              onClick={() => {
                onChange(year)
                setOpen(false)
              }}
              $active={year === value}
            >
              {year}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  )
}
