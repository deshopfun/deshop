export const IsValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const IsValidJSON = (json: string): boolean => {
  try {
    const parsed = JSON.parse(json)
    return typeof parsed === 'object' && parsed !== null
  } catch (e) {
    console.error(e)
    return false
  }
}

export const isValidHttpUrl = (str: string): boolean => {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export const isValidPassword = (pwd: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(pwd)
  const hasLowerCase = /[a-z]/.test(pwd)
  const hasNumbers = /\d/.test(pwd)
  const hasSymbols = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(pwd)
  const isLongEnough = pwd.length >= 8

  return hasUpperCase && hasLowerCase && hasNumbers && hasSymbols && isLongEnough
}
