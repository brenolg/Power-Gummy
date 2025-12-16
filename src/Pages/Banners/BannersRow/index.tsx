// CouponRow.tsx
import editIcon from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import { useState } from 'react'
import { FakeInput } from '@/components/form/FakeInput'
import type { Coupon } from '..' // ajusta o caminho se o index estiver em outra pasta
import { StatusValue, StatusMenu, StatusArrow, StatusOption, StatusDropdown } from './styles'

interface CouponRowProps {
  item: Coupon
  index: number
  onEdit: (item: Coupon) => void
  onDelete: (item: Coupon) => void
}

export default function BannersRow({ item, index, onEdit, onDelete }: CouponRowProps) {
  const [showEdit, setShowEdit] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)

  const [code, setCode] = useState(item.code)
  const [percent, setPercent] = useState(item.percent?.toString() ?? '')
  const [influencer, setInfluencer] = useState(item.influencer ?? '')
  const [active, setActive] = useState(item.active)

  const handleConfirm = () => {
    const edited: Coupon = {
      ...item, // mantém id, active, createdAt, usageCount
      code,
      percent: percent ? Number(percent) : item.percent,
      influencer: influencer || undefined,
      active,
    }
    console.log('EDITED', edited)

    onEdit(edited)
    setShowEdit(false)
  }

  return [
    <div key={`index-${index}`} className="grid-index">
      {index + 1}
    </div>,

    <div key={`created-${index}`} className="grid-item">
      {new Date(item.createdAt._seconds * 1000).toLocaleDateString('pt-BR')}
    </div>,

    <div key={`code-${index}`} className="grid-item">
      {showEdit ? <FakeInput value={code} onChange={setCode} /> : item.code || '-'}
    </div>,

    <div key={`percent-${index}`} className="grid-item">
      {showEdit ? (
        <FakeInput type="numberCents" value={percent} onChange={setPercent} />
      ) : item.percent != null ? (
        `${item.percent}%`
      ) : (
        '-'
      )}
    </div>,

    <div key={`usageCount-${index}`} className="grid-item">
      {item.usageCount != null ? `${item.usageCount}` : '0'}
    </div>,

    <div key={`influencer-${index}`} className={`grid-item ${!showEdit ? 'hidden' : ''}`}>
      {showEdit ? (
        <FakeInput value={influencer} onChange={setInfluencer} />
      ) : (
        item.influencer || '-'
      )}
    </div>,

    <div key={`status-${index}`} className="grid-item">
      {showEdit ? (
        <div style={{ position: 'relative' }}>
          <StatusDropdown $active={active} onClick={() => setOpenStatus(!openStatus)}>
            {active ? 'Ativo' : 'Inativo'}
            <StatusArrow $active={active} />
          </StatusDropdown>

          {openStatus && (
            <StatusMenu>
              <StatusOption
                $isActive={active}
                onClick={() => {
                  setActive(true)
                  setOpenStatus(false)
                }}
              >
                Ativo
              </StatusOption>

              <StatusOption
                $isActive={!active}
                onClick={() => {
                  setActive(false)
                  setOpenStatus(false)
                }}
              >
                Inativo
              </StatusOption>
            </StatusMenu>
          )}
        </div>
      ) : (
        <StatusValue $active={item.active}>{item.active ? 'Ativo' : 'Inativo'}</StatusValue>
      )}
    </div>,

    <div key={`actions-${index}`} className="grid-action-area">
      <div className="grid-action-btn">
        {showEdit ? (
          <button type="button" onClick={handleConfirm}>
            OK
          </button>
        ) : (
          <img src={editIcon} onClick={() => setShowEdit(true)} style={{ cursor: 'pointer' }} />
        )}
      </div>
      <button type="button" className="grid-action-btn" onClick={() => onDelete(item)}>
        <img src={trash} />
      </button>
    </div>,
  ]
}
