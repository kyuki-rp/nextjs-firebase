import React from 'react';
import GridLayout from 'react-grid-layout';
import { useState, useEffect } from 'react';
import { serverTimestamp } from "firebase/firestore";
import { addDoc, updateDoc, getDoc, getDocOnSnapshot, delDoc } from '../../hooks/updateFirestore'
import { getAuth } from '../../hooks/getAuth'
import { handleSignout } from '../../hooks/updateAuthentication'
import Card from './Card'
import Link from 'next/link'
import { useRouter } from "next/router"
import AnonymousSnackbar from "../../components/AnonymousSnackbar"


const Sticky = () => {

  const auth = getAuth();
  const router = useRouter();

  const [layouts, setLayouts] = useState([]);
  
  const elements = getDocOnSnapshot( `/users/${auth?.currentUser?.uid}/tasks` )

  const staticLayouts = [
    {i:'welcome', x:0 , y:0, w:1, h:0.37, static:true},
    {i:'sign', x:0 , y:0.37, w:1, h:0.3, static:true},
    {i:'add', x:0 , y:0.67, w:1, h:0.3, static:true},
    {i:'garbage', x:0, y:0.97, w:1, h:0.3, static:true}
  ] 

  useEffect(() => {
    const dynamicLayout = elements.map( (element) => {
      return {i:element.id, x:element.x, y:element.y, w:1, h:1, static:false}
    })
    setLayouts([...staticLayouts, ...dynamicLayout]);
  }, [elements]);


  const addTask = () => {
    addDoc( `/users/${auth.currentUser.uid}/tasks`, {content:'', type:'text', x:1 ,y:0 ,createAt:serverTimestamp()})
  };

  // const getTask = () => {
  //   getDoc( `/users/${auth.currentUser.uid}/tasks` ).then( response => {
  //     console.log(response)
  //   })
  // };

  const updateTask = (taskID, input) => {
    input['createAt'] = serverTimestamp()
    updateDoc( `/users/${auth.currentUser.uid}/tasks/${taskID}`, input)
  };


  const delTask = (id) => {
    delDoc( `/users/${auth.currentUser.uid}/tasks`, id )
  };

  const onDragStop = (layouts): void => {

    layouts.map( (layout) => {
      
      // データ更新
      // if (layout.i!='welcome' && layout.i!='sign' && layout.i!='add' && layout.i!='garbage') {
      if (!staticLayouts.map((staticLayout)=>{return staticLayout.i}).includes(layout.i)) {
        const element = elements.filter( (element) => {
          return element.id == layout.i;
        })[0]

        updateTask(layout.i, {content:element.content, type:element.type, x:layout.x, y:layout.y, createAt:serverTimestamp()})
      }

      // 削除
      if (layout.x==0) {
        delTask(layout.i)
      }
    }

    )
  };

  return (
    <>
      <AnonymousSnackbar />
      <GridLayout className="layout" layout={layouts} cols={6} rowHeight={200} width={1200} onDragStop={onDragStop} >
        <div key="welcome" style={{color:"#EEEEEE", backgroundColor:"#444444", textAlign:"center" }}>
          <div style = {{ whiteSpace: 'pre-line', gridAutoColumns: 'auto', 'fontWeight':'bold', fontSize: "70%", paddingTop:'20px'}}>
            ようこそ！{'\n'}
            {auth?.currentUser?.displayName || "匿名"}さん
          </div>
        </div>
        
          <div key="sign" style={{ color:"#EEEEEE", backgroundColor:"#A4C6FF", textAlign:"center", fontWeight: 'bold', cursor:"pointer", paddingTop:'15px'}}>
          { (auth?.currentUser?.isAnonymous==false && auth?.currentUser?.email!="sample@example.com") &&
            <Link href="/signin">  
                <a onClick={() => handleSignout(auth, router)}>Logout</a>
            </Link>
          }
          { (auth?.currentUser?.isAnonymous!=false || auth?.currentUser?.email=="sample@example.com") &&
            <Link href="/signin">
              Login
            </Link>
          }
          </div>
        

        <a key="add" onClick={() => addTask()} style={{ backgroundColor:"#AEFFBD", textAlign:"center", fontSize: '35px', fontWeight: 'bold', cursor:"pointer"}}>+</a>
        <div key="garbage" style={{backgroundColor:"#FFABCE", textAlign:"center"}}><img src='/images/garbage.png' width='60px' /></div>
        { elements.map( (element) =>
          <div key={element.id} style={{backgroundColor:"#FFFFBB", textAlign:"center"}}><Card element={element} /></div>
        )}
      </GridLayout>
      
    </>
  );
}

export default Sticky