import { useRouter } from "next/router"
import Seo from '../components/Seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function Layout({ children }) {
    const title = 'ポートフォリオ'
    const description = ''

    const router = useRouter();
    let content

    if (router.route=="/signin" || router.route=="/signup") {
      content = (
        <>
          <Image src="/images/background.jpg" layout="fill" objectFit="cover" style={{position: "relative", opacity: "0.5", zIndex:"10"}}/>
          <main style={{width:'300px', margin: 'auto'}}>
          <div  style={{position: "relative", zIndex:"100"}}>
            {children}
          </div>
          </main>
        </>
      )
    } else {
      content = (
        <>
          <Image src="/images/background.jpg" layout="fill" objectFit="cover" style={{position: "relative", opacity: "0.5", zIndex:"10"}}/>
          <div  style={{position: "relative", zIndex:"100"}}>
            <main>
              {children}
            </main>
          </div>
        </>
      )
    }

    return (
      <div style={{scrollPaddingTop:"70px"}}>
      <div style={{display:"flex", flexDirection:"column", backgroundColor:"#CCCCCC", minHeight:"100vh"}}>
        <Seo title={title} description={description}/>
        <Header />
        <div className="container" style={{paddingTop:"70px", paddingBottom:"20px"}}>{content}</div>
        <Footer />
     </div>
     </div>
    )
  }