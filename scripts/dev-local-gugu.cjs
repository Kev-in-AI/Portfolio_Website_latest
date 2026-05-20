const { spawn } = require('child_process')
const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend')

const processes = []

const spawnProcess = (command, args, options = {}) => {
  const child = spawn(command, args, {
    cwd: options.cwd || ROOT_DIR,
    stdio: 'inherit',
    shell: false,
    env: process.env
  })

  processes.push(child)

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      shutdown()
    }
  })

  return child
}

const shutdown = () => {
  processes.forEach((child) => {
    if (!child.killed) child.kill('SIGTERM')
  })
}

process.on('SIGINT', () => {
  shutdown()
  process.exit(0)
})

process.on('SIGTERM', () => {
  shutdown()
  process.exit(0)
})

spawnProcess('node', ['scripts/local-gugu-server.cjs'])
spawnProcess('npm', ['run', 'dev'], { cwd: FRONTEND_DIR })
