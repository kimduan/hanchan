import { motion } from 'framer-motion'
import type { Chapter } from '../data/story'
import PolaroidPhoto from './PolaroidPhoto'

const TILTS = [-3, 2.5, -1.5, 3, -2, 1.5]

const LAYOUT_CLASS: Record<Chapter['layout'], string> = {
  single: 'mx-auto max-w-[15rem] sm:max-w-sm',
  duo: 'mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:gap-6',
  grid: 'mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3',
}

export default function ChapterSection({ chapter }: { chapter: Chapter }) {
  const { index, title, subtitle, body, photos, layout } = chapter

  return (
    <section
      id={chapter.id}
      className="relative flex min-h-[100svh] flex-col justify-center px-6 py-24 sm:px-10"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-flex items-center gap-2.5 text-xs tracking-[0.3em] text-violet-300/60 uppercase">
            <span className="h-px w-8 bg-violet-300/30" />
            Chương {index}
            <span className="h-px w-8 bg-violet-300/30" />
          </span>

          <h2 className="font-script text-4xl text-transparent sm:text-6xl"
            style={{
              backgroundImage: 'linear-gradient(120deg, #ffffff 0%, #ddd6fe 50%, #f9a8d4 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm tracking-wide text-violet-200/60 sm:text-base">{subtitle}</p>
          )}

          <div className="mx-auto mt-8 max-w-xl space-y-2.5">
            {body.map((line, i) => (
              <motion.p
                key={i}
                className="text-base leading-relaxed font-light text-violet-50/85 sm:text-lg"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.18 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <div className={LAYOUT_CLASS[layout]}>
          {photos.map((photo, i) => (
            <PolaroidPhoto
              key={photo.src}
              photo={photo}
              tilt={TILTS[i % TILTS.length]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
