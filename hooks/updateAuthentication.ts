import { createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router"

export const handleSignup = (auth, router, email, password) => {
  createUserWithEmailAndPassword(auth, email, password).then(
    () => {
      handleUpdateProfile(auth, {displayName:"ななし"})
      router.push("/")
    }
  ).catch(
    () => {alert( '不正なメールアドレスです。' )}
  )
}

export const handleSignin = (auth, router, email, password) => {
  signInWithEmailAndPassword(auth, email, password).then(
    () => {
      alert( 'ログインしました。' );
      router.push("/");
    }
  ).catch(
    () => {alert( 'メールアドレスかパスワードが間違っています。' )}
  )
}

export const handleSignout = (auth, router) => {
    auth.signOut();
    alert( 'ログアウトしました。' );
    router.push("/");
  };
  
  export const handleDeleteAccount = (auth, router, password) => {
      const credential = EmailAuthProvider.credential(auth.currentUser?.email ?? '', password)
  
      reauthenticateWithCredential(auth.currentUser, credential).then(() => {
        auth.currentUser.delete();
        alert( 'アカウントを削除しました。' );
        router.push("/");
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