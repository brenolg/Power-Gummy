import BuyContainer from './BuyContainer'
import Header from './Header'
import InfoCarousel from './InfoCarousel'
import InstaFeedCarousel from './InstaFeedCarousel'
import { PageWrapper } from '@/styles/PageWrapper'
import FAQ from './FAQ'
import { faqData } from './FAQ/factory'
import Ingredients from './Ingredients'
import Hero from './Hero'
import ScienceSection from './ScienceSection'
import BenefitsSection from './BenefitsSection'
import Footer from './Footer'
import HowToUse from './HowToUse'
import Testimonials from './Testimonials'
import { useFetch } from '@/hooks/useFetch'
import { useEffect, useState } from 'react'
import RotatingBanner from './Banner'
import { useMediaQuery } from 'react-responsive'
import PageLoading from '@/components/PageLoading'

type BannerData = {
  imageUrl: string
  position: number
}

export default function Home() {
  const { fetcher } = useFetch()
  const [loading, setLoading] = useState(true)
  const [banerData, setBanerData] = useState<BannerData[] | null>(null)

  const isMobile = useMediaQuery({
    query: '(max-width: 640px)',
  })

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)

        const data = await fetcher<BannerData[]>(
          `/public/banner?platform=${isMobile ? 'mobile' : 'desktop'}`,
          'GET'
        )

        setBanerData(data as BannerData[])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [isMobile])

  if (loading) {
    return <PageLoading />
  }

  return (
    <PageWrapper>
      <Header />
      {banerData && <RotatingBanner banners={banerData} />}
      <InfoCarousel />
      <Hero />
      <ScienceSection />
      <Ingredients />
      <BenefitsSection />
      <BuyContainer />
      <HowToUse />
      <Testimonials />
      <InstaFeedCarousel />
      <FAQ items={faqData} contactCtaHref="/contato" />
      <Footer />
    </PageWrapper>
  )
}
