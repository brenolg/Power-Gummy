import styled from 'styled-components'

export const UploadBox = styled.div<{ $error?: boolean }>`
  border: 2px dashed ${({ $error }) => ($error ? '#FF4D4F' : '#E0E0E0')};
  border-radius: 10px;
  padding: 18px;
  cursor: pointer;
  transition: border 0.2s;

  &:hover {
    border-color: #c78a1b;
  }
`

export const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
`

export const UploadIcon = styled.div`
  font-size: 22px;
`

export const UploadText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  strong {
    color: #555;
  }

  span {
    font-size: 12px;
    color: #999;
  }
`

export const FileName = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #666;
`
