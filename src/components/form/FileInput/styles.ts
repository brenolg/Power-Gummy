import styled from 'styled-components'

export const UploadBox = styled.label<{ $error?: boolean }>`
  border: 1px dashed ${({ $error }) => ($error ? '#F00' : '#ccc')};
  border-radius: 10px;
  position: relative;

  cursor: pointer;
  display: flex;
  width: 315px;
  height: 56px;
  justify-content: center;
  align-items: center;
  transition: border 0.2s;
  border-radius: 5px;

  &:hover {
    border-color: #ba7e1b;
  }
`

export const UploadLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 315px;
  padding: 16px 16px 16px 16px;
  height: 56px;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`

export const UploadText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  strong {
    color: #757575;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  span {
    color: #ccc;

    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
`

export const FileName = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #666;
`
