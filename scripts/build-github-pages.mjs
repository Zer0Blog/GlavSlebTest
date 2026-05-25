import { existsSync, renameSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const apiDir = 'app/api'
const apiBackup = '.pages-build-api-backup'
const isCi = Boolean(process.env.GITHUB_ACTIONS)

function hideApiRoutes() {
  if (!existsSync(apiDir)) return
  if (isCi) {
    rmSync(apiDir, { recursive: true, force: true })
    console.log('Removed app/api for static export (CI)')
    return
  }
  if (existsSync(apiBackup)) {
    throw new Error(`Remove ${apiBackup} first (stale pages build backup)`)
  }
  renameSync(apiDir, apiBackup)
  console.log('Moved app/api aside for static export')
}

function restoreApiRoutes() {
  if (isCi || !existsSync(apiBackup)) return
  if (existsSync(apiDir)) rmSync(apiDir, { recursive: true, force: true })
  renameSync(apiBackup, apiDir)
  console.log('Restored app/api')
}

hideApiRoutes()

const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_BASE_PATH: '/sleb',
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://build:build@localhost:5432/build',
}

let exitCode = 0
try {
  for (const [cmd, args] of [
    ['npx', ['prisma', 'generate']],
    ['npm', ['run', 'build']],
  ]) {
    const r = spawnSync(cmd, args, { stdio: 'inherit', env, shell: process.platform === 'win32' })
    if (r.status !== 0) {
      exitCode = r.status ?? 1
      break
    }
  }
} finally {
  restoreApiRoutes()
}

process.exit(exitCode)
