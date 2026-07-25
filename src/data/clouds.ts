export interface CloudInfo {
  name: string
  logo: string
}

export const clouds: Record<string, CloudInfo> = {
  aws: { name: 'AWS', logo: './clouds/aws.svg' },
  gcp: { name: 'GCP', logo: './clouds/images.jpeg' },
  azure: { name: 'Azure', logo: './clouds/azure.png' },
  kubernetes: { name: 'Kubernetes', logo: './clouds/kubernetes.png' },
}

export const companyClouds: Record<string, (keyof typeof clouds)[]> = {
  TQI: ['aws'],
  Foursales: ['aws'],
  'Instituto Amazon Innovare': ['aws', 'kubernetes'],
  'Americanas s.a.': ['aws', 'gcp', 'kubernetes'],
  Linx: ['aws'],
}
