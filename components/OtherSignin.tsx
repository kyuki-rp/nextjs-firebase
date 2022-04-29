import React, { useState, useEffect } from "react"
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, EmailAuthProvider } from "firebase/auth"
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth } from '../hooks/getAuth'

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID,
      TwitterAuthProvider.PROVIDER_ID,
      GithubAuthProvider.PROVIDER_ID
  ],
}

const OtherSignin = () => {

    const auth = getAuth()

    const [widget, setWidget] = useState(null);
    useEffect(() => {
      setWidget(<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />)
    }, [])

    return (
      <>
        <h6 style={{textAlign: 'center', fontWeight: "bold"}}>他のアカウントでログイン</h6>
        {widget}
      </>
    )
  }


export default OtherSignin
