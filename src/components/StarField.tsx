import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Star = {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  opacity: number
}

function makeStars(count: number, maxSize: number, seedOffset: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    // Rải sao bằng công thức tất định để mỗi lần render ra cùng một bầu trời
    const n = i + seedOffset
    const left = (Math.sin(n * 12.9898) * 43758.5453) % 1
    const top = (Math.sin(n * 78.233) * 12345.6789) % 1
    const rand = (Math.sin(n * 45.164) * 9876.54321) % 1
    return {
      left: Math.abs(left) * 100,
      top: Math.abs(top) * 100,
      size: 1 + Math.abs(rand) * maxSize,
      delay: Math.abs(rand) * 6,
      duration: 2.5 + Math.abs(left) * 3.5,
      opacity: 0.35 + Math.abs(rand) * 0.65,
    }
  })
}

/**
 * Bầu trời sao cố định phía sau toàn trang.
 * Hai lớp sao trôi với tốc độ khác nhau khi cuộn để tạo chiều sâu (parallax).
 */
export default function StarField() {
  const { scrollYProgress } = useScroll()

  const farStars = useMemo(() => makeStars(90, 1.6, 1), [])
  const nearStars = useMemo(() => makeStars(45, 2.6, 500), [])

  const farY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  // Trời sáng dần lên một chút về cuối hành trình, như sắp tới bình minh
  const dawn = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0.15, 0.4])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Nền trời đêm */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#241a5e_0%,#0d0a24_45%,#06040f_100%)]" />

      {/* Vệt tinh vân tím hồng mờ ảo */}
      <div className="absolute top-[10%] -left-[10%] h-[45vh] w-[60vw] rounded-full bg-violet-600/12 blur-[110px]" />
      <div className="absolute right-[-5%] bottom-[15%] h-[40vh] w-[50vw] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <div className="absolute top-[45%] left-[30%] h-[35vh] w-[40vw] rounded-full bg-indigo-500/10 blur-[100px]" />

      <motion.div className="absolute inset-0" style={{ y: farY }}>
        {farStars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: nearY }}>
        {nearStars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.35)]"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </motion.div>

      {/* Ánh bình minh ấm dần lên ở cuối trang */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(244,114,182,0.6)_0%,rgba(167,139,250,0.25)_35%,transparent_70%)]"
        style={{ opacity: dawn }}
      />
    </div>
  )
}
