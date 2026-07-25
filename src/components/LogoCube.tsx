const SIZE = 56
const HALF = SIZE / 2

const FACE_TRANSFORMS = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
]

export default function LogoCube({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="logo-cube-socket h-20 w-20 shrink-0">
      <div className="logo-cube-scene h-14 w-14">
        <div className="logo-cube">
          {FACE_TRANSFORMS.map((transform, i) => (
            <div key={i} className="logo-cube-face" style={{ transform }}>
              <img
                src={src}
                alt={i === 0 ? alt : ''}
                className="h-full w-full object-contain p-2"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
