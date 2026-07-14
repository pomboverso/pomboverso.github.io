import fs from 'fs'
import path from 'path'

const REPOS = {
  mako: 'rama-io/mako',
  txori: 'rama-io/txori',
  tui: 'rama-io/tui',
  teyin: 'rama-io/teyin',
  okapi: 'rama-io/okapi',
}

const HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'rama-build-script',
}

async function ghFetch(url) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`)
  return res.json()
}

async function getRepoStats(repo) {
  const base = `https://api.github.com/repos/${repo}`
  const repoData = await ghFetch(base)

  return {
    stars: repoData.stargazers_count ?? 0,
    issues: repoData.open_issues_count ?? 0,
  }
}

async function init() {
  const statsResults = await Promise.allSettled(
    Object.entries(REPOS).map(async ([key, repo]) => {
      const stats = await getRepoStats(repo)
      return [key, stats]
    })
  )

  const repoStats = []

  for (const result of statsResults) {
    if (result.status === 'rejected') {
      console.error(`error: ${result.reason.message}`)
      continue
    }

    repoStats.push(result.value)
  }

  const dir = path.join('js')
  const file = path.join(dir, 'data_stats.js')

  fs.mkdirSync(dir, { recursive: true })

  fs.writeFileSync(file, `export default ${JSON.stringify(repoStats, null, 2)}`, 'utf8')

  console.log(repoStats)
}

init()
