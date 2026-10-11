import path from 'path'
import { fileURLToPath } from 'url'

// Every task resolves its paths relative to the lomdb folder
// (e.g. 'server/db', 'js/data_*.json'), so always run from here,
// no matter where the command was launched (repo root, CI, etc.).
process.chdir(path.dirname(fileURLToPath(import.meta.url)))

// Dynamic import so the chdir above runs BEFORE the tasks are loaded
// (several of them resolve paths at module load time).
const { default: init } = await import('./server/index.mjs')

init()
