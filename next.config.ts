import type { NextConfig } from 'next'

const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoBasePath = '/sleb'

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: 'export' as const } : {}),
  basePath: isGithubPages ? repoBasePath : undefined,
  assetPrefix: isGithubPages ? repoBasePath : undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
