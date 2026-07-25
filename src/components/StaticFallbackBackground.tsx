export default function StaticFallbackBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7cf7d0 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
      />
    </div>
  )
}
