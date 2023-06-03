import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAh0eCipnn91_RGVYZ2Hk4kBQ_EMXn8PpU',
  authDomain: 'fiber-peru.firebaseapp.com',
  projectId: 'fiber-peru',
  storageBucket: 'fiber-peru.appspot.com',
  messagingSenderId: '583513950711',
  appId: '1:583513950711:web:f9b1b26f285765bd7b46f2',
  measurementId: 'G-VK1M4YZD81',
}
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore(app)
