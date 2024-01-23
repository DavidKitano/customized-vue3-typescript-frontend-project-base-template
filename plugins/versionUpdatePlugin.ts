import fs from 'fs'
import path from 'path'

const writeVersion = (versionFile: fs.PathOrFileDescriptor, content: string | NodeJS.ArrayBufferView) => {
  fs.writeFile(versionFile, content, (err) => {
    if (err) throw err
  })
}

type optionsType = {
  version: number
}

export default (options: optionsType) => {
  let config: { publicDir: fs.PathLike }

  return {
    name: 'version-update',

    configResolved(resolvedConfig: { publicDir: fs.PathLike }) {
      config = resolvedConfig
    },

    buildStart() {
      const file = config.publicDir + path.sep + 'version.json'
      const content = JSON.stringify({ version: options.version })

      if (fs.existsSync(config.publicDir)) {
        writeVersion(file, content)
      } else {
        fs.mkdir(config.publicDir, (err) => {
          if (err) throw err
          writeVersion(file, content)
        })
      }
    }
  }
}
