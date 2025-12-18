import * as yup from 'yup'

const getFile = (value: any): File | null => {
  if (!value) return null
  if (value instanceof File) return value
  if (value instanceof FileList) return value[0]
  if (Array.isArray(value)) return value[0]
  return null
}

export const schema = yup.object({
  desktopImage: yup
    .mixed<File>()
    .required('A imagem desktop é obrigatória')
    .test('fileSize', 'Arquivo maior que 10MB', (value) => {
      const file = getFile(value)
      if (!file) return false
      return file.size <= 10 * 1024 * 1024
    })
    .test('fileType', 'Formato inválido', (value) => {
      const file = getFile(value)
      if (!file) return false
      return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
    }),

  mobileImage: yup
    .mixed<File>()
    .required('A imagem mobile é obrigatória')
    .test('fileSize', 'Arquivo maior que 10MB', (value) => {
      const file = getFile(value)
      if (!file) return false
      return file.size <= 10 * 1024 * 1024
    })
    .test('fileType', 'Formato inválido', (value) => {
      const file = getFile(value)
      if (!file) return false
      return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
    }),

  context: yup.string().required('Contexto é obrigatório'),
})
