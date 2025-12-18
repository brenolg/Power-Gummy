import { FormProvider, useForm, type Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MainButton, MInput } from '@/components'
import FileInput from '@/components/form/FileInput'

import { useFetch } from '@/hooks/useFetch'
import {
  BannerPreview,
  CardsContainer,
  FileCard,
  FileDescription,
  MainContainer,
  MainTitle,
  MobilePreview,
  SubTtile,
} from './styles'
import { schema } from './schema'

/* =========================
   TIPAGEM DO FORM
========================= */
export type BannerFormData = {
  desktopImage: File
  mobileImage: File
  context: string
}

export default function BannerForm() {
  const { fetcher } = useFetch()

  const methods = useForm<BannerFormData>({
    resolver: yupResolver(schema) as Resolver<BannerFormData>,
    defaultValues: {
      desktopImage: undefined as unknown as File,
      mobileImage: undefined as unknown as File,
      context: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const handleSubmitForm = async (data: BannerFormData) => {
    const isValid = await methods.trigger()

    if (!isValid) {
      console.error('Form inválido')
      return
    }

    try {
      await fetcher('/admin/banners', 'POST', {
        body: data,
      })
    } catch (error) {
      console.error('Erro ao enviar banner:', error)
    }
  }

  const getFileFromValue = (value: any): File | null => {
    if (!value) return null
    if (value instanceof File) return value
    if (value instanceof FileList) return value[0]
    if (Array.isArray(value)) return value[0]
    return null
  }

  const desktopValue = methods.watch('desktopImage')
  const desktopFile = getFileFromValue(desktopValue)
  const imageUrl = desktopFile ? URL.createObjectURL(desktopFile) : null

  const mobileValue = methods.watch('mobileImage')
  const mobileFile = getFileFromValue(mobileValue)
  const mobileUrl = mobileFile ? URL.createObjectURL(mobileFile) : null
  return (
    <MainContainer>
      <MainTitle>Criar banner</MainTitle>
      <SubTtile>Upload de Imagem e recomendações</SubTtile>
      <FileDescription>Arquivo de imagem: JPG ou PNG</FileDescription>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitForm)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        >
          <CardsContainer>
            <FileCard>
              <h2 className="title ">🖥 Computador / Desktop</h2>
              <p className="proportion">Proporção da imagem: 1440px x 620px </p>

              <FileInput
                name="desktopImage"
                label="Upload imagem Desktop"
                accept="image/png, image/jpeg"
                mb={24}
              />
              <h2 className="previewTitle">Preview Desktop</h2>

              <div className="header" />
              <BannerPreview>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </BannerPreview>
            </FileCard>

            <FileCard>
              <h2 className="title ">📱Celular / Mobile</h2>
              <p className="proportion">Proporção da imagem: 435px x 620px </p>

              <FileInput
                name="mobileImage"
                label="Upload imagem Mobile"
                accept="image/png, image/jpeg"
                mb={24}
              />
              <h2 className="previewTitle mobile">Preview Mobile</h2>

              <div className="header mobile-header" />
              <MobilePreview>
                {mobileUrl && (
                  <img
                    src={mobileUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </MobilePreview>
            </FileCard>
          </CardsContainer>

          <SubTtile>Banner ativos</SubTtile>
          <div style={{ maxWidth: '315px' }}>
            <MInput name="context" type="text" placeholder="Endereço" hasAsterisk mb={26} />
          </div>
          <MainButton type="submit" maxW={180} font={14} height={50}>
            Criar Banner
          </MainButton>
        </form>
      </FormProvider>
    </MainContainer>
  )
}
