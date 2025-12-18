import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputContainer, InputError } from '../FormCommomStyle'
import { UploadBox, UploadLabel, UploadText, UploadIcon, FileName } from './styles'
import imgError from '@/assets/icons/error.svg'

interface FileInputProps {
  name: string
  label: string
  accept?: string
  maxSizeMB?: number
  mb?: number
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  label,
  accept = 'image/*',
  maxSizeMB = 10,
  mb,
}) => {
  const { control, clearErrors } = useFormContext()
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <InputContainer $mb={mb}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const error = fieldState.error?.message

          return (
            <>
              <UploadBox $error={!!error}>
                <UploadLabel>
                  <UploadIcon>📁</UploadIcon>

                  <UploadText>
                    <strong>{label}</strong>
                    <span>Máx: {maxSizeMB}MB</span>
                  </UploadText>

                  <input
                    type="file"
                    hidden
                    accept={accept}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (!file) return

                      setFileName(file.name)
                      clearErrors(name)
                      field.onChange(file)
                    }}
                  />
                </UploadLabel>
              </UploadBox>

              {fileName && <FileName>{fileName}</FileName>}

              <InputError $error={!!error}>
                {error && (
                  <>
                    <img src={imgError} className="img-error" />
                    {error}
                  </>
                )}
              </InputError>
            </>
          )
        }}
      />
    </InputContainer>
  )
}

export default FileInput
