import React from "react";
import { useState, useEffect } from 'react';
import { handleDeleteAccount, handleUpdateEmail, handleUpdatePassword, handleUpdateProfile } from '../../components/UserSignin'
import Layout from '../../components/Layout'
import { getAuth, getStorage } from '../../hooks/getAuth'


export default function Whiteboard() {

  const auth = getAuth()
  const storage = getStorage()

  const [radiobutton, setRadiobutton] = useState("")
  const [editFlg, setEditFlg] = useState(false);
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [disabled, setDisabled] = useState({password:true, newEmail:true, newPassword:true, checkNewPassword:true, button: true})
  const [input, setInput] = useState({password:"", newEmail:"", newPassword:"", checkNewPassword:""})

  useEffect(() => {
    setDisplayName(auth?.currentUser?.displayName)
    setEmail(auth?.currentUser?.email)
  }, [auth?.currentUser]);
  
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, inputType) => {
      if (inputType=="パスワード") {
        setInput({password:e.currentTarget.value, newEmail:input.newEmail, newPassword:input.newPassword, checkNewPassword:input.checkNewPassword})
      } else if (inputType=="新しいEメールアドレス") {
        setInput({password:input.password, newEmail:e.currentTarget.value, newPassword:input.newPassword, checkNewPassword:input.checkNewPassword})
      } else if (inputType=="新しいパスワード") {
        setInput({password:input.password, newEmail:input.newEmail, newPassword:e.currentTarget.value, checkNewPassword:input.checkNewPassword})
      } else if (inputType=="新しいパスワード（確認）") {
        setInput({password:input.password, newEmail:input.newEmail, newPassword:input.newPassword, checkNewPassword:e.currentTarget.value})
      }
  }

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadiobutton(e.currentTarget.value)
    if (auth.currentUser.email=="sample@example.com") {
        setDisabled(
            {password:true, newEmail:true, newPassword:true, checkNewPassword:true, button:true}
        )
    } else if (e.currentTarget.value=="Eメールアドレスの変更") {
        setDisabled(
            {password:false, newEmail:false, newPassword:true, checkNewPassword:true, button:false}
        )
    } else if (e.currentTarget.value=="パスワードの変更") {
        setDisabled(
            {password:false, newEmail:true, newPassword:false, checkNewPassword:false, button:false}
        )
    } else if (e.currentTarget.value=="アカウントの削除") {
        setDisabled(
            {password:false, newEmail:true, newPassword:true, checkNewPassword:true, button:false}
        )
    }
  }

  const handleUpdate = (auth, input) => {
      
    if (auth.currentUser.email!="sample@example.com" && radiobutton=="Eメールアドレスの変更") {
        handleUpdateEmail(auth, input.password, input.newEmail)
    } else if (auth.currentUser.email!="sample@example.com" && radiobutton=="パスワードの変更") {
        handleUpdatePassword(auth, input.password, input.newPassword, input.checkNewPassword)
    } else if (auth.currentUser.email!="sample@example.com" && radiobutton=="アカウントの削除") {
        handleDeleteAccount(auth, input.password)
    }
    setInput({password:"", newEmail:"", newPassword:"", checkNewPassword:""})
  }

  const updateEdit = () => {
    handleUpdateProfile(auth, {displayName: displayName});
    setEditFlg(false);
  }


  return (
    <>
      <Layout>
        <h3 style={{paddingTop:"1em", paddingBottom:"0.5em"}}>Myアカウントページ</h3>

        <div>
          Neme:&nbsp;
          { !editFlg &&
            <>
              {displayName}
              <button onClick={() => {setEditFlg(true);}} style={{border:'none', background:'transparent'}}><img src='/images/edit.png' width='20px' /></button>
            </>
          }
          { editFlg &&
            <>
              <input type="text" value={displayName} onChange={event => {setDisplayName(event.target.value)}} style={{width: '100px', height:'30px', border: 'none', borderRadius:'5px'}} ></input>
              <button onClick={() => updateEdit()} style={{border:'none', background:'transparent'}}><img src='/images/check-mark.png' width='20px' style={{opacity: "0.5"}}/></button>
            </>
          }
         </div>

        <div>Email:&nbsp;{email}</div><br />

        <div className="radiobox">
            <input id="radio1" className="radiobutton" name="hoge" type="radio" value="Eメールアドレスの変更" onChange={(e) => {onValueChange(e)}}/>
            <label htmlFor="radio1">&nbsp;Eメールアドレスの変更</label><br />
            <input id="radio2" className="radiobutton" name="hoge" type="radio" value="パスワードの変更" onChange={(e) => {onValueChange(e)}}/>
            <label htmlFor="radio2">&nbsp;パスワードの変更</label><br />
            <input id="radio3" className="radiobutton" name="hoge" type="radio" value="アカウントの削除" onChange={(e) => {onValueChange(e)}}/>
            <label htmlFor="radio3">&nbsp;アカウントの削除</label><br />
        </div><br />

        <input type="password" className="form-control" disabled={disabled.password} style={{width:'215px', margin: '5px'}} value={input.password} placeholder="パスワード" onChange={(e) => {handleChangeInput(e, "パスワード")}} required></input>
        <input type="email" className="form-control" disabled={disabled.newEmail} style={{width:'215px', margin: '5px'}} value={input.newEmail} placeholder="新しいEメールアドレス"  onChange={(e) => {handleChangeInput(e, "新しいEメールアドレス")}} required></input>
        <input type="password" className="form-control" disabled={disabled.newPassword} style={{width:'215px', margin: '5px'}} value={input.newPassword} placeholder="新しいパスワード" onChange={(e) => {handleChangeInput(e, "新しいパスワード")}} required></input>
        <input type="password" className="form-control" disabled={disabled.checkNewPassword} style={{width:'215px', margin: '5px'}} value={input.checkNewPassword} placeholder="新しいパスワード（確認）" onChange={(e) => {handleChangeInput(e, "新しいパスワード（確認）")}} required></input>
        <div style={{width:'215px', margin:'5px'}} >
          <button className="btn" disabled={disabled.button} style={{width:'215px', color:'#CCCCCC', backgroundColor: '#333333'}} onClick={() => {handleUpdate(auth, input)}}>更新</button>
        </div>


      </Layout>
    </>
  );
}