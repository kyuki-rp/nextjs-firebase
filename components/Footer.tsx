import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
    return (
      <div style={{fontWeight:"bold", marginTop: "auto", opacity:"0.8"}}>
        <Navbar bg="dark" variant="dark" style={{height:"80px"}}>
            <Nav className="mx-auto" style={{color:"#CCCCCC", fontSize:"70%", marginTop:"10px"}}>
                © {new Date().getFullYear()} Middenii All rights reserved.
            </Nav>
        </Navbar>
      </div>
    )
}