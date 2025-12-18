import React, { useState, useId } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputContainer, InputError } from '../FormCommomStyle'
import { UploadBox, UploadLabel, UploadText } from './styles'
import imgError from '@/assets/icons/error.svg'
import fileIcon from '@/assets/icons/file.svg'
import uploadIcon from '@/assets/icons/upload.svg'

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
  const inputId = useId()

  return (
    <InputContainer $mb={mb}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const error = fieldState.error?.message

          return (
            <>
              {/* O label controla o input */}
              <UploadBox as="label" htmlFor={inputId} $error={!!error}>
                <UploadLabel>
                  <img src={fileIcon} alt="" />

                  <UploadText>
                    <strong>{fileName || label}</strong>
                    <span>Máx: {maxSizeMB}MB</span>
                  </UploadText>

                  <img src={uploadIcon} alt="" />
                </UploadLabel>
                {/* input hidden mas funcional */}
                <input
                  id={inputId}
                  type="file"
                  hidden
                  accept={accept}
                  onChange={(e) => {
                    const files = e.target.files
                    if (!files || !files.length) return

                    setFileName(files[0].name)
                    clearErrors(name)

                    // 🔴 NÃO passe files[0]
                    // field.onChange(files[0])

                    // ✅ passe o FileList
                    field.onChange(files)
                  }}
                />
              </UploadBox>

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
