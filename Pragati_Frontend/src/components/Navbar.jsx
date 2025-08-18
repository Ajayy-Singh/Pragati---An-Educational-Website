import React from 'react'
import { Nav } from 'react-bootstrap'   
import logo from '../assets/logo.webp'
import Sidebar from './Sidebar'

const Navbar = () => {
  return (
    <Nav className="shadow-sm navbar navbar-light bg-light">
        <img className='mx-3' style={{ width: '50px', height: '50px' }} src={logo} alt="logo" />
        <div className='mx-4 d-flex'>
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
        </div>
    </Nav>
  )
}

export default Navbar



