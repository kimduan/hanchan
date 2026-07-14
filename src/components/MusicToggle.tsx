import { useEffect, useRef, useState } from 'react'
import { asset } from '../lib/asset'

/**
 * Nút bật/tắt nhạc nền.
 * Nhạc mặc định TẮT vì trình duyệt chặn tự động phát tiếng.
 * Thêm file nhạc vào `public/music/nhac-nen.mp3`; chưa có file thì nút tự ẩn đi.
 */
const TRACK = asset('/music/nhac-nen.mp3')

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = new Audio(TRACK)
    audio.loop = true
    audio.volume = 0.35
    audio.addEventListener('error', () => setAvailable(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setAvailable(false)
    }
  }

  if (!available) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
      className="fixed top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/25 bg-night-800/60 text-violet-100/80 backdrop-blur-md transition hover:scale-105 hover:border-violet-300/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
    >
      {playing ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          <path d="M3 3l18 18" />
        </svg>
      )}
    </button>
  )
}
