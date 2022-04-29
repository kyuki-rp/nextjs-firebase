import Link from 'next/link'
import Layout from '../components/Layout'
import { getAuth } from '../hooks/getAuth'
   


export default function Home() {

  return (
    <>
      <Layout>
        <Link href="account">
          <a><img src='/images/user-icon.png' height='150px'/></a>
        </Link><br />
        <Link href="sticky">
          <a><img src='/images/sticky.png' height='150px'/></a>
        </Link>
      </Layout>
    </>
  )
}