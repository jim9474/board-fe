import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <div className='list'>
            <div className='main'>
                <h1 className=''>더본코리아</h1>
                <div>
                    {user ? (
                        <>
                            <span>{user.userId} 님</span>
                            <span style={{ cursor: 'pointer' }} onClick={handleLogout}>로그아웃</span>
                        </>
                    ) : (
                        <>
                            <span><Link to={'/login'}>로그인</Link></span>
                            <span><Link to={'/createUser'}>회원가입</Link></span>
                        </>
                    )}
                </div>
            </div>
            <div>
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
        </div>
    )
}

export default Header
