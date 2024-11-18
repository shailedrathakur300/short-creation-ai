// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'shorts-ai-d7a49.firebaseapp.com',
  projectId: 'shorts-ai-d7a49',
  storageBucket: 'shorts-ai-d7a49.firebasestorage.app',
  messagingSenderId: '512404653036',
  appId: '1:512404653036:web:84965ac9f6b6f697d636c9',
  measurementId: 'G-XVFFEFTVLK',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app) // Storage bucket
