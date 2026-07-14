import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Photo } from '../data/story'

type Props = {
  photo: Photo
  /** Độ nghiêng của khung ảnh, cho giống ảnh dán trong album */
  tilt?: number
  index?: number
  className?: string
}

/** Khung thay thế khi ảnh chưa được thêm vào `public/photos/` */
function MissingPhoto() {
  return (
    <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-night-700 to-night-800 px-3 text-center">
      <span className="text-2xl" style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}>
        ⭐
      </span>
      <p className="text-[10px] leading-relaxed text-violet-300/40">thêm ảnh vào public/photos</p>
    </div>
  )
}

export default function PolaroidPhoto({ photo, tilt = 0, index = 0, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.figure
      className={`group relative rounded-sm bg-white/90 p-2.5 pb-9 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/20 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 40, rotate: tilt * 2.2, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
    >
      <div className="overflow-hidden bg-night-800">
        {failed ? (
          <MissingPhoto />
        ) : (
          <img
            src={photo.src}
            alt={photo.caption ?? ''}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      {photo.caption && (
        <figcaption className="absolute right-0 bottom-2.5 left-0 px-2 text-center font-script text-lg leading-none text-night-800">
          {photo.caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
