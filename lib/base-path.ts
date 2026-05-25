/** Optional URL prefix (e.g. CDN subpath). Empty by default on Vercel. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function assetUrl(path: string): string {
  if (!path.startsWith('/')) return `${basePath}/${path}`
  return `${basePath}${path}`
}
