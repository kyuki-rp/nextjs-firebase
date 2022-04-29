import React, { useState, useEffect } from "react"
import Layout from '../components/Layout'
import UserSignup from '../components/UserSignup'
import OtherSignin from '../components/OtherSignin'

const Signup = () => {

    return (
      <Layout>
        <div className="bg-light px-sm-4 py-4" style={{opacity: "0.8", borderRadius: "10px"}}>
          <UserSignup></UserSignup>
          <hr></hr>
          <OtherSignin></OtherSignin>
        </div>
      </Layout>
    )
  }


export default Signup
