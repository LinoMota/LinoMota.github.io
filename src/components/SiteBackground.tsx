import { useMediaQuery } from '../hooks/useMediaQuery'
import FaultyTerminal from '../reactbits/FaultyTerminal'

const DESKTOP_CONFIG = {
  scale: 2.7,
  digitSize: 1.5,
  gridMul: [2, 1] as [number, number],
}

const MOBILE_CONFIG = {
  scale: 1.3,
  digitSize: 1.5,
  gridMul: [1, 1.8] as [number, number],
}

export default function SiteBackground() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const { scale, digitSize, gridMul } = isMobile ? MOBILE_CONFIG : DESKTOP_CONFIG

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <FaultyTerminal
        tint="#1cff00"
        scale={scale}
        digitSize={digitSize}
        gridMul={gridMul}
        noiseAmp={0.7}
        timeScale={0.9}
        scanlineIntensity={0.7}
        mouseStrength={0.7}
        curvature={0.08}
        glitchAmount={0}
        flickerAmount={1}
        chromaticAberration={0}
        dither={0}
        mouseReact
        pageLoadAnimation
        brightness={0.3}
        className="h-full w-full"
      />
    </div>
  )
}
