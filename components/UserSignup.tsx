import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Alert, Snackbar } from "@mui/material"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { getAuth } from '../hooks/getAuth'
import { handleUpdateProfile } from './UserSignin'



const UserSignup = () => {
  const auth = getAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")

  const handleSubmit = async (auth, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password==checkPassword) {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        handleUpdateProfile(auth, {displayName:"ななし"})
        router.push("/")
      }
      ).catch(
        () => {alert( '不正なメールアドレスです。' )}
      )
    } else {
      alert( 'パスワードが一致しません。' )
    }

  }
  const handleClose = async () => {
    await router.push("/")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const handleChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.currentTarget.value)
  }

  return (
      <div style={{textAlign:"center"}}>
        <Snackbar
          open={auth?.currentUser?.email!="sample@example.com"}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          key={"top" + "center"}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning">
            すでにログインしています
          </Alert>
        </Snackbar>
        <div style={{fontWeight: "bold"}}>新規アカウントの作成</div>
        <form onSubmit={(e) => {handleSubmit(auth, e)}}>
        <input type="email" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="メールアドレス" onChange={handleChangeEmail} required></input>
          <input type="password" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="パスワード" onChange={handleChangePassword} required></input>
          <input type="password" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="パスワード（確認）" onChange={handleChangeCheckPassword} required></input>
          <button type="submit" className="btn" style={{width:'200px', marginTop:'5px', backgroundColor: '#EEEEEE'}}>新規作成</button>

          <div>
            <Link href={"/privacypolicy"}>
              <a style={{fontSize: '70%'}}>プライバシーポリシー</a>
            </Link><br />
            <Link href={"/signin"}>
              <a style={{fontSize: '70%'}}>すでにアカウントをお持ちの方はこちら</a>
            </Link>
          </div>
        </form>
      </div>
    
  )
}

export default UserSignup