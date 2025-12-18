import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebaseClient'

export async function uploadBannerImage(file: File, folder: 'desktop' | 'mobile') {
  const storageRef = ref(storage, `banners/${folder}/banner-${Date.now()}-${file.name}`)

  const snap = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snap.ref)

  return downloadURL
}
