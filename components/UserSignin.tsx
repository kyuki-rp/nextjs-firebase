import React, { useState } from "react"
import Link from "next/link"
import { getAuth } from '../hooks/getAuth'
import { handleSignin } from "../hooks/updateAuthentication"
import LoginSnackbar from "./LoginSnackbar"
import { useRouter } from "next/router"


const UserSignin = () => {
  const auth = getAuth()
  const router = useRouter();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (auth, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSignin(auth, router, email, password)
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <>
      <div style={{textAlign:"center"}}>
        <LoginSnackbar />
        <form onSubmit={(e) => {handleSubmit(auth, e)}}>
          <div style={{fontWeight: "bold"}}>Myアカウントでログイン</div>
          <input type="email" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="メールアドレス" onChange={handleChangeEmail} required></input>
          <input type="password" className="form-control" style={{width:'200px', margin: '5px auto'}} placeholder="パスワード" onChange={handleChangePassword} required></input>
          <button type="submit" className="btn" style={{width:'200px', marginTop:'5px', backgroundColor: '#EEEEEE'}}>ログイン</button>
          <div> 
            <Link href={"/signup"}>
              <a style={{fontSize: '70%'}}>新規アカウントの作成はこちら</a>
            </Link>
          </div>
        </form>
      </div>
    </>
    
  )
}

export default UserSignin