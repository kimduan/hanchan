import { motion, useScroll, useSpring } from 'framer-motion'

/** Dải sáng ở mép trên trang, đầy dần theo tiến độ cuộn */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-200 shadow-[0_0_10px_rgba(167,139,250,0.7)]"
      style={{ scaleX }}
    />
  )
}
