import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BABY } from '../data/story'

/** Quãng đường ngôi sao bay: sang phải 45% bề ngang, xuống dưới 20% chiều cao màn hình */
const FLIGHT_X = 0.45
const FLIGHT_Y = 0.2

/**
 * Góc chúc xuống của đường bay, tính theo tỉ lệ màn hình thật.
 * Màn hình dọc (điện thoại) sao rơi dốc hơn nhiều so với màn hình ngang, nên phải
 * tính động thì đuôi sao mới nằm đúng trên đường bay.
 */
function useFlightAngle() {
  const [angle, setAngle] = useState(20)

  useEffect(() => {
    const update = () => {
      const rad = Math.atan2(FLIGHT_Y * window.innerHeight, FLIGHT_X * window.innerWidth)
      setAngle((rad * 180) / Math.PI)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return angle
}

/** Ngôi sao 5 cánh rơi ngang trời rồi lịm dần vào tên bé — mở đầu câu chuyện */
function ShootingStar() {
  const angle = useFlightAngle()

  return (
    <motion.div
      className="pointer-events-none absolute top-[8%] left-[5%] -z-10"
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{ x: ['0vw', '45vw'], y: ['0vh', '20vh'], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.6,
        delay: 1.6,
        times: [0, 0.15, 0.7, 1],
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: 6,
      }}
    >
      <div className="relative">
        {/* Quầng sáng toả quanh ngôi sao */}
        <div className="absolute -inset-8 rounded-full bg-violet-200/20 blur-2xl" />

        {/* Đuôi sao — xoay quanh tâm ngôi sao để luôn nằm dọc theo đường bay */}
        <div className="absolute inset-0" style={{ rotate: `${angle}deg` }}>
          <div className="absolute top-1/2 right-6 h-[3px] w-52 -translate-y-1/2 rounded-full bg-gradient-to-l from-amber-100 via-violet-200/60 to-transparent blur-[1px]" />
          <div className="absolute top-1/2 right-6 h-2 w-28 -translate-y-1/2 rounded-full bg-gradient-to-l from-white/60 to-transparent blur-md" />
        </div>

        {/* Ngôi sao 5 cánh, vừa rơi vừa xoay chậm */}
        <motion.svg
          viewBox="0 0 24 24"
          className="relative h-9 w-9 drop-shadow-[0_0_14px_rgba(254,243,199,0.9)]"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <linearGradient id="star-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#f9a8d4" />
            </linearGradient>
          </defs>
          <path
            d="M12 1.6l3.09 6.26 6.91 1.01-5 4.87 1.18 6.88L12 17.35l-6.18 3.27L7 13.74l-5-4.87 6.91-1.01L12 1.6z"
            fill="url(#star-fill)"
          />
        </motion.svg>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <ShootingStar />

      <motion.p
        className="mb-6 text-sm tracking-[0.35em] text-violet-300/70 uppercase"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Ngày {BABY.birthDate}
      </motion.p>

      <div className="relative">
        {/* Quầng sáng sau tên bé */}
        <div
          className="absolute inset-0 -z-10 rounded-full bg-violet-400/25 blur-3xl"
          style={{ animation: 'glow-pulse 5s ease-in-out infinite' }}
        />
        <motion.h1
          className="font-script text-5xl leading-tight text-transparent sm:text-7xl md:text-8xl"
          style={{
            backgroundImage:
              'linear-gradient(120deg, #fef3c7 0%, #ffffff 35%, #f9a8d4 70%, #c4b5fd 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
        >
          {/* Màn hình hẹp: xuống dòng giữa họ đệm và tên. Màn rộng: một dòng liền */}
          <span className="block sm:inline">{BABY.familyName}</span>{' '}
          <span className="block sm:inline">{BABY.givenName}</span>
        </motion.h1>
      </div>

      <motion.p
        className="mt-8 max-w-md text-lg font-light text-violet-100/80 sm:text-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      >
        Có một ngôi sao rơi xuống thế gian
        <br />
        và trở thành con gái của bố mẹ.
      </motion.p>

      <motion.div
        className="mt-14 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        <span className="text-xs tracking-[0.25em] text-violet-300/60 uppercase">
          Cuộn xuống để bắt đầu
        </span>
        <motion.div
          className="flex h-11 w-6 items-start justify-center rounded-full border border-violet-300/40 p-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="h-2 w-1 rounded-full bg-violet-200/80" />
        </motion.div>
      </motion.div>
    </section>
  )
}
