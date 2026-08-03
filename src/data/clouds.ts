import websiteonly from './site-content/en/websiteonly.json'

export interface CloudInfo {
  name: string
  logo: string
}

// Provider display name/icon - not part of dynamic-cv's input, kept local.
export const clouds: Record<string, CloudInfo> = {
  aws: { name: 'AWS', logo: './clouds/aws.svg' },
  gcp: { name: 'GCP', logo: './clouds/images.jpeg' },
  azure: { name: 'Azure', logo: './clouds/azure.png' },
  kubernetes: { name: 'Kubernetes', logo: './clouds/kubernetes.png' },
}

// company -> cloud provider keys is not translated, so either locale's file works.
export const companyClouds: Record<string, (keyof typeof clouds)[]> = websiteonly.companyClouds as Record<
  string,
  (keyof typeof clouds)[]
>
