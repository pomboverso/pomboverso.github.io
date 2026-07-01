const REPOS = {
  mako: 'rama-io/mako',
  txori: 'rama-io/txori',
  tui: 'rama-io/tui',
  teyin: 'rama-io/teyin',
}

const HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'rama-build-script',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

async function ghFetch(url) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`)
  return res.json()
}

async function getRepoStats(repo) {
  const base = `https://api.github.com/repos/${repo}`

  const [repoData] = await Promise.all([ghFetch(base)])

  return {
    name: repo.split('/')[1].toUpperCase(),
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

  for (const result of statsResults) {
    if (result.status === 'rejected') {
      console.error(`✗ badge: ${result.reason.message}`)
      continue
    }

    const [key, stats] = result.value

    console.log({ key, stats })
  }
}

init()
