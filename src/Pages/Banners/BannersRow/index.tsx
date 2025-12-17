// CouponRow.tsx
import editIcon from '@/assets/icons/edit.svg'
import trash from '@/assets/icons/trash.svg'
import { useState } from 'react'
import { FakeInput } from '@/components/form/FakeInput'
import type { Banner } from '..' // ajusta o caminho se o index estiver em outra pasta
import {
  StatusValue,
  StatusMenu,
  StatusArrow,
  StatusOption,
  StatusDropdown,
  DeviceLabel,
  PositionDropdown,
  PositionArrow,
  PositionMenu,
  PositionOption,
  PositionLabel,
} from './styles'
import desktopIcon from '@/assets/imgs/desktop.svg'
import mobileIcon from '@/assets/imgs/mobile.svg'

interface BannersRowProps {
  item: Banner
  index: number
  onEdit: (item: Banner) => void
  onDelete: (item: Banner) => void
}

export default function BannersRow({ item, index, onEdit, onDelete }: BannersRowProps) {
  const [showEdit, setShowEdit] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [position, setPosition] = useState(item.position)
  const [context, setContext] = useState(item.context ?? '')
  const [active, setActive] = useState(item.active)
  const [openPosition, setOpenPosition] = useState(false)

  const handleConfirm = () => {
    const edited: Banner = {
      ...item, // mantém id, active, createdAt, usageCount
      position,
      context: context || '',
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
      {new Date(item.createdAt).toLocaleDateString('pt-BR')}
    </div>,

    <div key={`position-${index}`} className="grid-item">
      {showEdit ? (
        <div style={{ position: 'relative' }}>
          <PositionDropdown $open={openPosition} onClick={() => setOpenPosition((prev) => !prev)}>
            {position}
            <PositionArrow $open={openPosition} />
          </PositionDropdown>

          {openPosition && (
            <PositionMenu>
              {[1, 2, 3, 4].map((n) => (
                <PositionOption
                  key={n}
                  $selected={position === n}
                  onClick={() => {
                    setPosition(n)
                    setOpenPosition(false)
                  }}
                >
                  {n}
                </PositionOption>
              ))}
            </PositionMenu>
          )}
        </div>
      ) : (
        <PositionLabel>{position}</PositionLabel>
      )}
    </div>,

    <div key={`format-${index}`} className="grid-item">
      <DeviceLabel>
        <img src={item.device === 'mobile' ? mobileIcon : desktopIcon} alt={item.device} />
        {item.device === 'mobile' ? 'Mobile' : 'Desktop'}
      </DeviceLabel>
    </div>,

    <div key={`preview-${index}`} className="grid-item">
      <img src={item.imageUrl} />
    </div>,

    <div key={`context-${index}`} className={`grid-item ${!showEdit ? 'hidden' : ''}`}>
      {showEdit ? <FakeInput value={context} onChange={setContext} /> : item.context || '-'}
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
