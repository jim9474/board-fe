import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.reload();
    };

    return (
        <header className="border-bottom shadow-sm mb-3">
            <Container className="py-2">
                <Row className="align-items-center">
                    <Col md={6}>
                        <h2 className="text-primary m-0">더본코리아</h2>
                    </Col>
                    <Col md={6} className="text-md-end text-center">
                        {user ? (
                            <>
                                <span className="me-3 fw-bold">{user.userId} 님</span>
                                <span
                                    className="text-danger"
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleLogout}
                                >
                                    로그아웃
                                </span>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="me-3 text-decoration-none text-dark">
                                    로그인
                                </Link>
                                <Link to="/createUser" className="text-decoration-none text-dark">
                                    회원가입
                                </Link>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>

            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse id="main-navbar">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/game">게임</Nav.Link>
                            <Nav.Link as={Link} to="/streaming">방송</Nav.Link>
                            <Nav.Link as={Link} to="/politics">정치</Nav.Link>
                            <Nav.Link as={Link} to="/sports">스포츠</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;