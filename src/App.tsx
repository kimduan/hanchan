import StarField from './components/StarField'
import ScrollProgress from './components/ScrollProgress'
import MusicToggle from './components/MusicToggle'
import Hero from './components/Hero'
import ChapterSection from './components/ChapterSection'
import Finale from './components/Finale'
import Guestbook from './components/Guestbook'
import { CHAPTERS } from './data/story'

export default function App() {
  return (
    <>
      <StarField />
      <ScrollProgress />
      <MusicToggle />

      <main>
        <Hero />
        {CHAPTERS.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} />
        ))}
        <Finale />
        <Guestbook />
      </main>
    </>
  )
}
