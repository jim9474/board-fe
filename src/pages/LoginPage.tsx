import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const LoginPage = () => {
    return (
        <div className="d-flex align-items-center" style={{ height: '80vh' }}>
            <Form className='list w-50 mx-auto'>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Id
                    </Form.Label>
                    <Col sm={5}>
                    <Form.Control type="id" placeholder="Id" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={5}>
                    <Form.Control type="password" placeholder="Password" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 d-grid gap-2">
                    <Col sm={{ span: 10, offset: 5 }}>
                    <Button type="submit" size='lg'>Sign in</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginPage
