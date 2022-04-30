import React, { useRef } from "react";
import { useState, useEffect } from 'react';
import { updateDoc } from '../../hooks/updateFirestore'
import { serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getAuth, getStorage } from '../../hooks/getAuth'

export default function Card( props ) {

  const { element } = props

  const auth = getAuth()
  const storage = getStorage()

  const [edit, setEdit] = useState(element?.content);
  const [editFlg, setEditFlg] = useState(false);
  const [fileUrl, setFileUrl] = useState(undefined);
  
  useEffect(() => {

    if (element?.type=='image'||element?.type=='video') {
      const fileRef = ref(storage, `/users/${auth.currentUser.uid}/${element?.content}`)
      getDownloadURL(fileRef).then((downloadURL) => {
        setFileUrl(downloadURL);
      });
    }
    
  }, [element]);

  const updateEdit = (element, content) => {
    const edit = {content:content, type:'text', x:element.x, y:element.y, createAt:serverTimestamp()}
    updateDoc( `/users/${auth.currentUser.uid}/tasks/${element.id}`, edit)
    setEditFlg(false)
  }

  const inputRef = useRef(null);
  const fileInput = () => {
    inputRef.current.click();
  };

  const updateFile = ( file ) =>{
    const fileType = file.type.split('/')[0]
    const edit = {content:file.name, type:fileType, x:element.x, y:element.y, createAt:serverTimestamp()}
    updateDoc( `/users/${auth.currentUser.uid}/tasks/${element.id}`, edit)
    
  }

  const fileUpload = (event) => {
    const file = event.target.files[0]

    const fileType = file.type.split('/')[0]
    if (fileType=='image'||fileType=='video') {

      const fileRef = ref(storage, `/users/${auth.currentUser.uid}/${file?.name}`)
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
        },
        (error) => {
          console.log("Error");
        },
        () => {
          updateFile(file)
        }
      );
    }
  }
  
  

  return (
    <>
      { (element?.type=='text' && !editFlg) &&
        <>
          <input hidden  ref={inputRef} type="file" onChange={fileUpload} />
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button onClick={() => fileInput()} style={{border:'none', background:'transparent'}}><img src='/images/upload.png' width='20px' /></button>
            <button onClick={() => setEditFlg(true)} style={{border:'none', background:'transparent'}}><img src='/images/edit.png' width='20px' /></button>
          </div>
          <div style = {{ whiteSpace: 'pre-line', gridAutoColumns: 'auto' }}>{element.content}</div>
        </>
      }
      { (element?.type=='text' && editFlg) &&
        <>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <button onClick={() => updateEdit(element, edit)} style={{border:'none', background:'transparent'}}><img src='/images/update.png' width='20px' /></button>
          </div>
          <textarea value={edit} rows={edit.split('\n').length} onChange={event => setEdit(event.target.value)} style={{maxHeight:'160px', resize:'none'}} />
        </>
      }
      { element?.type=='image' &&
        <>
          <div style = {{ whiteSpace: 'pre-line', gridAutoColumns: 'auto' }}><img src={fileUrl} width='100%' /></div>
        </>
      }
      { element?.type=='video' &&
        <>
          <video controls src={fileUrl} height='100%'/>
        </>
      }
    </>
  );
}