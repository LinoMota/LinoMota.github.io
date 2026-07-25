import { motion } from 'framer-motion'

export default function SectionHeading({
  index,
  heading,
  sub,
}: {
  index: string
  heading: string
  sub?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-14"
    >
      <span className="font-pixel text-xs text-accent">{index}</span>
      <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{heading}</h2>
      {sub && <p className="mt-3 max-w-2xl text-text-dim">{sub}</p>}
    </motion.div>
  )
}
