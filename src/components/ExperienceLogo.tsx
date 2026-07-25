import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import LogoCube from './LogoCube'

export default function ExperienceLogo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="h-20 w-20 shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full w-full"
      >
        {inView && <LogoCube src={src} alt={alt} />}
      </motion.div>
    </div>
  )
}
