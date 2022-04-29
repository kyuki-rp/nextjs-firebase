import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Alert, Snackbar } from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuth } from '../hooks/getAuth'
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword, updateProfile } from "firebase/auth";


export const handleSignout = (auth) => {
  auth.signOut();
  alert( 'ログアウトしました。' );
};

export const handleDeleteAccount = (auth, password) => {
    const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)

    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
      auth.currentUser.delete();
      alert( 'アカウントを削除しました。' );
    }).catch((error) => {
      alert( 'パスワードが間違っています。' );
    });
};

export const handleUpdateEmail = (auth, password, newEmail) => {
  const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)

  reauthenticateWithCredential(auth.currentUser, credential).then(() => {
    updateEmail(auth.currentUser, newEmail)
    alert( 'Eメールアドレスが更新されました。' );
  }).catch((error) => {
    alert( 'パスワードが間違っています。' );
  });
};

export const handleUpdatePassword = (auth, password, newPassword, checkNewPassword) => {
  const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)
  console.log(credential)

  if (newPassword==checkNewPassword) {
    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
      updatePassword(auth.currentUser, newPassword)
      alert( 'パスワードが更新されました。' );
    }).catch((error) => {
      console.log(error)
      alert( 'パスワードが間違っています。' );
    });
  } else {
      alert( 'パスワードが一致しません。' );
  } 

};

export const handleUpdateProfile = (auth, newProfile) => {
  updateProfile(auth.currentUser, newProfile).then(() => {
    () => {alert( '値が更新されました。' )}
  }).catch(
    () => {alert( '入力値が無効です。' )}
  );
}

const UserSignin = () => {
  const auth = getAuth()

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (auth, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, email, password).then(
      () => {router.push("/")}
      
    ).catch(
      () => {alert( 'メールアドレスかパスワードが間違っています。' )}
    )
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const handleClose = async () => {
    await router.push("/")
  }

  return (
    <>
      <div style={{textAlign:"center"}}>
        <Snackbar
          open={auth?.currentUser?.email!="sample@example.com"}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={3000}
          key={"top" + "center"}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="warning">
            すでにログインしています
          </Alert>
        </Snackbar>

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