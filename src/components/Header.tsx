import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <div className='list'>
            <h1 className=''>더본코리아</h1>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/game">게임</Nav.Link>
                    <Nav.Link href="/streaming">방송</Nav.Link>
                    <Nav.Link href="/politics">정치</Nav.Link>
                    <Nav.Link href="/sports">스포츠</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
