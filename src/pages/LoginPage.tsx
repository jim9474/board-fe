import React, { useState, useContext, useEffect } from 'react';
import { Button, Col, Form, Row, Container, Card } from 'react-bootstrap';
import useApi from '../apis/Api';
import { AuthContext } from '../auth/AuthContext';
import type { User } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loginStatus, setLoginStatus] = useState<'pass' | 'unpass' | null>(null);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState<User>({
        userId: '',
        userPw: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const isValid = (data: User) =>
        data.userId.trim() !== '' && data.userPw.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid(formData)) {
            useApi.post('/login', formData)
            .then(res => {
                const { token, user } = res.data;
                setLoginStatus('pass');
                login(token, user);
                navigate('/');
            })
            .catch(err => {
                setLoginStatus('unpass');
                setMsg(err.response?.data?.message || '로그인 실패');
            });
        }
    };

    useEffect(() => {
      console.log('🔁 컴포넌트 마운트됨');
    }, []);

    return (
        <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
            <Card className="p-5 shadow-lg rounded" style={{ width: '400px' }}>
                <h3 className="text-center mb-4 fw-bold">로그인</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="아이디 입력"
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호 입력"
                            value={formData.userPw}
                            onChange={(e) => setFormData({ ...formData, userPw: e.target.value })}
                        />
                        {loginStatus === 'unpass' && (
                            <div className="mt-2 text-danger small">
                                {msg}
                            </div>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit" size="lg" className="w-100">
                        로그인
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginPage;