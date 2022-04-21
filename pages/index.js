import { HewanChips, HewanCard } from '@components/hewan/'
import { TaglineText } from '@components/ui'
import * as URL from '@constants/url'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Home() {
  return (
    <main>
      <div className="relative h-[320px] bg-landing-hero bg-cover bg-no-repeat">
        <div className="absolute h-full w-full bg-landing-overlay-hero" />
        <div className="relative mx-auto flex h-full w-[1200px] items-end py-16">
          <p className="w-[600px] text-3xl font-medium leading-[64px] tracking-widest text-white">
            Temukan hewan favoritmu melalui <span className="font-bold">carihewan.com</span>
          </p>
        </div>
      </div>
      <div className="main-container-col">
        <HewanChips />
        <TaglineText>Hewan yang sedang laris di pasaran</TaglineText>
        <div className="hewan-card-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((v) => (
            <HewanCard href={`${URL.HEWAN}/${v}`} />
          ))}
        </div>
      </div>
    </main>
  )
}
