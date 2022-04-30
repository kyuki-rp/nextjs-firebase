import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth"
import { fbauth, fbstorage } from '../lib/firebase';
import { useRouter } from "next/router"

export const getAuth = () => {
  const auth = fbauth
  const router = useRouter();

  const [authorization, setAuthorization] = useState(auth);

  const [flg, setFlg] = useState(0);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // signInAnonymously(auth)
        signInWithEmailAndPassword(auth, 'sample@example.com', 'password')
      }
      setFlg(1)
      setAuthorization(auth)
    })
  }, []);
  return authorization
}

export const getStorage = () => {
  return fbstorage
}


