import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BABY, FINALE } from '../data/story'

/** Bắn pháo hoa liên tục trong `duration` mili-giây */
function launchFireworks(duration = 5000) {
  const end = Date.now() + duration
  const colors = ['#a78bfa', '#ec4899', '#fef3c7', '#ffffff', '#c4b5fd']

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.75 },
      colors,
      scalar: 0.9,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.75 },
      colors,
      scalar: 0.9,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()

  // Vài chùm nổ bung ở giữa trời
  const bursts = [0, 700, 1500, 2400, 3400]
  bursts.forEach((delay) =>
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 100,
        startVelocity: 38,
        origin: { x: 0.25 + Math.random() * 0.5, y: 0.35 + Math.random() * 0.2 },
        colors,
        ticks: 220,
      })
    }, delay),
  )
}

function Candle({ lit, delay }: { lit: boolean; delay: number }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Ngọn lửa */}
      <div className="relative h-10 w-5">
        {lit ? (
          <>
            {/* Quầng sáng ấm toả ra xung quanh */}
            <div className="absolute -inset-5 rounded-full bg-amber-400/30 blur-xl" />
            <div className="absolute -inset-2 rounded-full bg-orange-300/40 blur-md" />

            {/* Thân lửa: hình vuông bo 3 góc rồi xoay 45° → giọt nước nhọn đầu hướng lên */}
            <div
              className="absolute inset-x-0 bottom-0 mx-auto h-6 w-5 origin-bottom"
              style={{ animation: `flicker 1.1s ease-in-out ${delay}s infinite` }}
            >
              {/* Kéo dài theo chiều dọc SAU khi đã xoay, nếu không ngọn lửa sẽ bị chĩa xiên */}
              <div
                className="absolute bottom-0 left-1/2"
                style={{ transform: 'translateX(-50%) scaleY(1.3)', transformOrigin: 'bottom' }}
              >
                <div
                  className="h-5 w-5 rotate-45 bg-gradient-to-tl from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_18px_7px_rgba(251,191,36,0.5)]"
                  style={{ borderRadius: '0 50% 50% 50%' }}
                />
                {/* Lõi lửa sáng trắng bên trong */}
                <div
                  className="absolute bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-gradient-to-tl from-amber-100 to-white blur-[0.5px]"
                  style={{ borderRadius: '0 50% 50% 50%' }}
                />
              </div>
            </div>
          </>
        ) : (
          <motion.div
            className="absolute inset-x-0 bottom-1 mx-auto h-4 w-1 rounded-full bg-slate-400/40 blur-[2px]"
            initial={{ opacity: 0.8, y: 0 }}
            animate={{ opacity: 0, y: -22 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
        )}
      </div>
      {/* Thân nến */}
      <div className="h-14 w-3 rounded-t-sm bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 shadow-[inset_-2px_0_3px_rgba(0,0,0,0.15)]" />
    </div>
  )
}

export default function Finale() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [blownOut, setBlownOut] = useState(false)

  const blowOut = useCallback(() => {
    if (blownOut) return
    setBlownOut(true)
    launchFireworks()
  }, [blownOut])

  // Nếu người xem không bấm vào bánh, tự thổi nến sau vài giây để họ vẫn thấy pháo hoa
  useEffect(() => {
    if (!inView || blownOut) return
    const timer = setTimeout(blowOut, 4500)
    return () => clearTimeout(timer)
  }, [inView, blownOut, blowOut])

  return (
    <section
      ref={ref}
      id="chuc-mung"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      {/* Bánh sinh nhật */}
      <motion.button
        type="button"
        onClick={blowOut}
        aria-label={blownOut ? 'Nến đã tắt' : 'Bấm để thổi nến'}
        className="group relative cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Ánh nến hắt lên */}
        {!blownOut && (
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-amber-300/15 blur-3xl" />
        )}

        <div className="relative flex flex-col items-center">
          <div className="flex items-end gap-5">
            <Candle lit={!blownOut} delay={0} />
            <Candle lit={!blownOut} delay={0.4} />
          </div>

          {/* Tầng trên */}
          <div className="relative -mt-0.5 h-16 w-40 rounded-t-md bg-gradient-to-b from-rose-200 to-rose-300 shadow-lg">
            <div className="absolute inset-x-0 top-0 h-3 rounded-t-md bg-white/70" />
            <div className="absolute inset-x-0 top-2.5 flex justify-around">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-3 w-1.5 rounded-b-full bg-violet-300/70" />
              ))}
            </div>
          </div>
          {/* Tầng dưới */}
          <div className="relative h-20 w-60 rounded-t-md rounded-b-lg bg-gradient-to-b from-violet-200 to-violet-300 shadow-xl">
            <div className="absolute inset-x-0 top-0 h-3 bg-white/70" />
            <div className="absolute inset-x-0 top-2.5 flex justify-around">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <span key={i} className="h-3.5 w-1.5 rounded-b-full bg-rose-400/80" />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-3 text-center font-script text-2xl text-violet-900/70">
              2
            </div>
          </div>
          {/* Đĩa bánh */}
          <div className="h-2 w-72 rounded-full bg-violet-100/25 blur-[1px]" />
        </div>

        {!blownOut && (
          <motion.span
            className="mt-6 block text-xs tracking-[0.25em] text-violet-200/70 uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Bấm vào bánh để thổi nến
          </motion.span>
        )}
      </motion.button>

      {/* Lời chúc — chỉ hiện sau khi thổi nến */}
      <motion.div
        className="mt-14 max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={blownOut ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 -z-10 rounded-full bg-rose-500/25 blur-3xl"
            style={{ animation: 'glow-pulse 5s ease-in-out infinite' }}
          />
          <h2
            className="font-script text-4xl leading-tight text-transparent sm:text-6xl"
            style={{
              backgroundImage:
                'linear-gradient(120deg, #fde68a 0%, #ffffff 25%, #ec4899 65%, #db2777 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            {FINALE.title}
          </h2>
        </div>

        <p className="mt-6 text-lg font-light text-violet-50/85 sm:text-xl">{FINALE.message}</p>

        <p className="mt-10 font-script text-2xl text-violet-200/70">— {FINALE.signature} —</p>

        <p className="mt-16 text-xs tracking-[0.3em] text-violet-300/40 uppercase">
          {BABY.fullName} · {BABY.birthDate}
        </p>
      </motion.div>
    </section>
  )
}
