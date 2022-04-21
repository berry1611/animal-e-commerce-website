import _ from 'lodash'
import { useRouter } from 'next/router'
import { Image, Text } from '@components/ui'
import Logo from '@images/logo-cari-hewan.png'
import * as URL from '@constants/url'

const inDevelopmentPages = [URL.FAQ, URL.KEBIJAKAN_PRIVASI, URL.TENTANG_KAMI]

const EmptyPage = () => {
  const { asPath } = useRouter()

  const isPageInDevelopment = _.includes(inDevelopmentPages, asPath)

  return (
    <div className="flex flex-col items-center pt-16">
      <Image src={Logo} width={150} height={150} />
      <Text className="mb-2 text-xl font-semibold">
        Mohon maaf halaman yang dicari tidak dapat ditemukan
      </Text>
      <Text className="mb-8 text-gray-700">
        {isPageInDevelopment
          ? 'Halaman yang dicari sedang dalam tahap pengembangan'
          : 'Halaman yang dicari tidak ada didalam direktori carihewan.com'}
      </Text>
    </div>
  )
}

export default EmptyPage
