const fs = require('fs')
const { dirname, join } = require('path')
const { argv } = require('process')

const root = dirname(__dirname)
const manifest = Object.assign({},
  ...argv.slice(2)
    .map(file => fs.readFileSync(join(root, file)))
    .map(JSON.parse.bind(JSON))
)

fs.writeFileSync(
  join(root, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
)
