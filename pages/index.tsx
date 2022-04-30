import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => {

  return (
    <>
      <Layout>
        <Link href="account">
          <a><img src='/images/user-icon.png' height='100px'/></a>
        </Link><br />
        <Link href="sticky">
          <a><img src='/images/sticky.png' height='150px'/></a>
        </Link>
      </Layout>
    </>
  )
}

export default Home