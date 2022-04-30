import * as React from "react"
import Layout from "../components/Layout"

const Contact = () => {

  return (
    <Layout>
      <h3 style={{paddingTop:"1em", paddingBottom:"0.5em"}}>プライバシーポリシー</h3>
      <p>
        登録いただいた個人情報は認証機能のみに利用いたします。<br />
        第三者に個人情報を提供することはありません。<br />
      </p>
      <h3 style={{paddingTop:"1em", paddingBottom:".5em"}}>免責事項</h3>
      <p>
        当サイトのコンテンツはすべてデモコンテンツです。<br />
        当サイトによって生じた損害について、一切の責任を負いかねます。<br />
        また、登録いただいた個人情報は予告なく削除することがあります。<br />
        あらかじめご了承ください。<br />
      </p>
    </Layout>
  )
}

export default Contact

