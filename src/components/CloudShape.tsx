import type { CloudInfo } from '../data/clouds'

export default function CloudShape({ cloud, delay = 0 }: { cloud: CloudInfo; delay?: number }) {
  return (
    <div className="cloud-3d-scene h-[56px] w-[84px]" title={cloud.name}>
      <div className="cloud-3d" style={{ animationDelay: `${delay}s` }}>
        <div className="cloud-3d-puff cloud-3d-puff--left" />
        <div className="cloud-3d-puff cloud-3d-puff--top" />
        <div className="cloud-3d-puff cloud-3d-puff--right" />
        <div className="cloud-3d-puff cloud-3d-puff--main" />
        <div className="cloud-3d-logo">
          <img src={cloud.logo} alt={cloud.name} loading="lazy" />
        </div>
      </div>
    </div>
  )
}
