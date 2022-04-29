import React, { useState, useEffect } from "react"
import Layout from '../components/Layout'
import UserSignin from '../components/UserSignin'
import OtherSignin from '../components/OtherSignin'

const Signin = () => {

    return (
      <Layout>
        <div className="bg-light px-sm-4 py-4" style={{opacity: "0.8", borderRadius: "10px"}}>
          <UserSignin></UserSignin>
          <hr></hr>
          <OtherSignin></OtherSignin>
        </div>
      </Layout>
    )
  }


export default Signin
