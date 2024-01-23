const auth = ref({
  hasLogin: false,
  name: ''
})

function restoreAuth(): boolean {
  const storageAuth = JSON.parse(localStorage.getItem('auth') as string)
  if (!storageAuth) return false

  auth.value.hasLogin = storageAuth.hasLogin
  auth.value.name = storageAuth.name

  return auth.value.hasLogin
}

function setAuth(name: string) {
  auth.value.hasLogin = true
  auth.value.name = name

  localStorage.setItem('auth', JSON.stringify(auth.value))
}

function clearAuth() {
  auth.value.hasLogin = false
  auth.value.name = ''

  localStorage.setItem('auth', JSON.stringify(auth.value))
}

restoreAuth()

export { auth, setAuth, clearAuth }
