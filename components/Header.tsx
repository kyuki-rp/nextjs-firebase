import { getAuth } from '../hooks/getAuth'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { handleSignout } from '../components/UserSignin'

export default function Header() {
    const auth = getAuth()

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
                      { (auth?.currentUser?.isAnonymous!=false || auth?.currentUser?.email=="sample@example.com") &&
                        <Nav.Link href="/signin" >
                          Login
                        </Nav.Link>
                      }
                      { (auth?.currentUser?.isAnonymous==false && auth?.currentUser?.email!="sample@example.com") &&
                        <Nav.Link href="/" >
                          <a onClick={() => handleSignout(auth)}>Logout</a>
                        </Nav.Link>
                      }
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
      </div>
    )
}