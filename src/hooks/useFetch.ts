// useFetch.ts
import { useCallback } from 'react'

const BASE = 'https://us-central1-powergummy-prod.cloudfunctions.net/api'
//'https://ee4e70e047d9.ngrok-free.app/powergum-backend/us-central1/api'
// prod https://us-central1-powergummy-prod.cloudfunctions.net/api
// local http://127.0.0.1:5001/powergum-backend/us-central1/api

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type Query = Record<string, string | number | boolean | null | undefined>
type HeadersRec = Record<string, string>

export type FetchError = {
  status: number
  payload: unknown
}

function joinUrl(base: string, path: string) {
  return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '')
}

function queryString(q?: Query) {
  if (!q) return ''
  const s = new URLSearchParams()
  for (const [k, v] of Object.entries(q)) {
    if (v !== undefined && v !== null) s.append(k, String(v))
  }
  const txt = s.toString()
  return txt ? `?${txt}` : ''
}

function isAbortError(e: unknown): e is DOMException {
  return e instanceof DOMException && e.name === 'AbortError'
}

export function useFetch(baseUrl: string = BASE) {
  const fetcher = useCallback(
    async <T>(
      path: string,
      method: Method,
      opts?: {
        body?: unknown
        query?: Query
        headers?: HeadersRec
        token?: string
        signal?: AbortSignal
      }
    ): Promise<T | undefined> => {
      const { body, query, headers, token: passedToken, signal } = opts || {}

      const localToken = localStorage.getItem('powergummy.token')
      const token = passedToken || localToken

      const url = joinUrl(baseUrl, path) + queryString(query)

      const h: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers ?? {}),
      }

      try {
        const res = await fetch(url, {
          method,
          headers: h,
          body: body !== undefined ? JSON.stringify(body) : undefined,
          signal,
        })

        const ct = res.headers.get('content-type') ?? ''
        const isJson = ct.includes('application/json')

        if (!res.ok) {
          const payload = isJson ? await res.json().catch(() => null) : await res.text()
          throw { status: res.status, payload } as FetchError
        }

        const data = (isJson ? await res.json().catch(() => null) : await res.text()) as T

        return data
      } catch (e) {
        if (isAbortError(e)) return undefined
        throw e
      }
    },
    [baseUrl]
  )

  return { fetcher }
}
