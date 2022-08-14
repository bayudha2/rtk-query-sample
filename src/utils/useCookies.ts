import CryptoJS from 'crypto-js'
import Cookies from 'universal-cookie'

import config from '@/app/config'

const cookies = new Cookies()
const USER_KEY = `${config.PROJECT_KEY}_user`

function setCookie(cookieName: string, cookiePayload: any): void {
  const chiperText = CryptoJS.AES.encrypt(
    JSON.stringify(cookiePayload),
    config.ENCRYPTOR_KEY
  )
  cookies.set(cookieName, chiperText.toString(), { path: '/' })
}

function getCookie(cookieName: string, key?: string): string | void {
  if (cookies.get(cookieName) !== undefined) {
    const bytes = CryptoJS.AES.decrypt(
      cookies.get(cookieName),
      config.ENCRYPTOR_KEY
    )

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    if (!decryptedData) return
    if (key) return decryptedData[key]

    return decryptedData
  }
}

function clearCookie(cookieName: string): void {
  cookies.remove(cookieName, { path: '/' })
}

/****** COOKIE HOOKS ******/

// SET

function setUserCookie(payload: any): void {
  setCookie(USER_KEY, payload)
}

// GET

export const getToken = (): string | void => {
  return getCookie(USER_KEY, 'Token')
}

function getUsername(): string | void {
  return getCookie(USER_KEY, 'Name')
}

function getUserData(): any {
  return getCookie(USER_KEY)
}

function logout(): void {
  clearCookie(USER_KEY)
}

export default function useCookie() {
  return {
    getToken,
    getUserData,
    getUsername,
    logout,
    setUserCookie,
  }
}
