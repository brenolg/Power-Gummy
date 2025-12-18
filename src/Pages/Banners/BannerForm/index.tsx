import { FormProvider, useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MainButton } from '@/components'
import FileInput from '@/components/form/FileInput'

import { useFetch } from '@/hooks/useFetch'

/* =========================
   TIPAGEM DO FORM
========================= */
export type BannerFormData = {
  desktopImage: File
}

/* =========================
   SCHEMA YUP
========================= */
const schema = yup.object({
  desktopImage: yup
    .mixed<File>()
    .required('A imagem é obrigatória')
    .test('fileSize', 'Arquivo maior que 10MB', (file) => {
      if (!file) return false
      return file.size <= 10 * 1024 * 1024
    })
    .test('fileType', 'Formato inválido', (file) => {
      if (!file) return false
      return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
    }),
})

/* =========================
   COMPONENTE
========================= */
export default function BannerForm() {
  const { fetcher } = useFetch()

  const methods = useForm<BannerFormData>({
    resolver: yupResolver(schema) as Resolver<BannerFormData>,
    defaultValues: {
      desktopImage: undefined as unknown as File,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const handleSubmitForm = async (data: BannerFormData) => {
    /* =========================
       EXEMPLO COM FORMDATA
    ========================= */
    const formData = new FormData()
    formData.append('desktopImage', data.desktopImage)

    try {
      await fetcher('/admin/banners', 'POST', {
        body: formData,
        isFormData: true, // caso seu hook suporte
      })
    } catch (error) {
      console.error('Erro ao enviar banner:', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitForm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault()
        }}
      >
        <div>
          <div>Banner Desktop</div>

          <FileInput
            name="desktopImage"
            label="Upload imagem Desktop"
            accept="image/png, image/jpeg, image/webp"
            mb={24}
          />
        </div>

        <MainButton type="submit">Salvar banner</MainButton>
      </form>
    </FormProvider>
  )
}
