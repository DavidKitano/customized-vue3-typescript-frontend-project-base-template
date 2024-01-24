export type Version = {
  version: number
}

export const fetchVersionFile = async () => {
  try {
    const res = await fetch('/version.json')
    const jsonRes = (await res.json()) as unknown as Version
    return new Date(jsonRes.version)
  } catch (error) {
    console.error(error)
    return new Date()
  }
}

export const checkVersionUpdate = async () => {
  try {
    const res = await fetch('/version.json')
    const jsonRes = (await res.json()) as unknown as Version
    const version = String(jsonRes.version)
    const localVersion = localStorage.getItem('version')
    if (!localVersion) {
      localStorage.setItem('version', version)
      return false
    }
    if (localVersion !== version) {
      localStorage.setItem('version', version)
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}
