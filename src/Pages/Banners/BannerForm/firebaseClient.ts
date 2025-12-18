// src/services/firebaseClient.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCDXJXK1d4H2dqQWdwKs4cxmiTRRBCeL3g',
  authDomain: 'powergummy-prod.firebaseapp.com',
  projectId: 'powergummy-prod',
  storageBucket: 'powergummy-prod.firebasestorage.app',
  messagingSenderId: '860091628560',
  appId: '1:860091628560:web:edebc9d4e6f5acd8619e95',
  measurementId: 'G-1XLD58WZNG',
}

// 🔒 Evita inicializar mais de uma vez (importante em React)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const storage = getStorage(app)
