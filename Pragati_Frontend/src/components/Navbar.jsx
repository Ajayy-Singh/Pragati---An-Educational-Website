import React from 'react'
import { Nav } from 'react-bootstrap'   
import Logo from "../assets/Logo.png" 
import Sidebar from './Sidebar/Sidebar'

const Navbar = () => {
  return (
    <Nav className="navbar navbar-light bg-light shadow-sm">
        <img className='mx-3' style={{ width: '50px', height: '50px' }} src={Logo} alt="logo" />
        <div className='d-flex mx-4'>
        <input
            type="text"
            className="form-control me-3"
            placeholder="Search..."
            style={{ maxWidth: '200px' }}
        />
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href='/resourse'>Resourse</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
        <Sidebar />
        </div>
    </Nav>
  )
}

export default Navbar