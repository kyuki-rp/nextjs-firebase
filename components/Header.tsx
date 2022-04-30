import { getAuth } from '../hooks/getAuth'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { handleSignout } from '../hooks/updateAuthentication'
import { useRouter } from "next/router"

const Header = () => {
    const auth = getAuth();
    const router = useRouter();

    return (
      <div>
        <div className='fixed-top'>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style={{fontWeight:"bold", opacity:"0.8"}}>
                <Nav className="mx-5">
                    <Nav.Link style={{color:"#DEB887"}} href="/">Portfolio</Nav.Link>
                </Nav>
                <Navbar.Toggle className="mx-3" aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse className="mx-5" id="responsive-navbar-nav">
                    <Nav className='ms-auto'>
                      <Nav.Link href="/" >
                        Home
                      </Nav.Link>
                      { (auth?.currentUser?.isAnonymous!=false || auth?.currentUser?.email=="sample@example.com") &&
                        <Nav.Link href="/signin" >
                          Login
                        </Nav.Link>
                      }
                      { (auth?.currentUser?.isAnonymous==false && auth?.currentUser?.email!="sample@example.com") &&
                        <Nav.Link href="/" >
                          <a onClick={() => handleSignout(auth, router)}>Logout</a>
                        </Nav.Link>
                      }
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
      </div>
    )
}

export default Header