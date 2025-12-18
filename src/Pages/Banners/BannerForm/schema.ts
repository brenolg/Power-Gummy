import * as yup from 'yup'

const validateImageDimensions = (
  file: File,
  expectedWidth: number,
  expectedHeight: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img.width === expectedWidth && img.height === expectedHeight)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(false)
    }

    img.src = url
  })
}
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
    })
    .test('dimensions', 'A imagem deve ter exatamente 1440px x 620px', async (value) => {
      const file = getFile(value)
      if (!file) return false
      return validateImageDimensions(file, 1440, 620)
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
    })
    .test('dimensions', 'A imagem deve ter exatamente 435px x 620px', async (value) => {
      const file = getFile(value)
      if (!file) return false
      return validateImageDimensions(file, 435, 620)
    }),
  context: yup.string().required('Contexto é obrigatório'),
})
