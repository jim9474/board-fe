import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import type {UserCreateInfo} from '../components/SignUpFormComp';
import useApi from '../apis/Api';
import { AuthContext } from '../auth/AuthContext';
import type {User} from '../auth/AuthContext';
import type {AuthContextType} from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [loginStatus, setLoginStatus] = useState<'pass' | 'unpass' | null>(null);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState<User>({
        userId: '',
        userPw: ''
    });
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const isValid = (data: User) => {
        return(
            data.userId.trim() !== '' &&
            data.userPw.trim() !== ''
        );
    };

    const handleSubmit = (e: React.FormEvent, formData: User) => {
        e.preventDefault();

        if(isValid(formData)) {
            useApi.post('/login', formData)
            .then(res => {
                console.log('로그인 성공');
                const {token, user} = res.data;
                setLoginStatus('pass');
                // 로그인 성공 시 전역 상태 업데이트 및 localStorage 저장
                login(token, user);

                navigate('/');
            })
            .catch(err => {
                console.log('에러');
                setLoginStatus('unpass');
                setMsg(err.response?.data?.message);
            })
        }
    };

    return (
        <div className="d-flex align-items-center" style={{ height: '80vh' }}>
            <Form className='list w-50 mx-auto' onSubmit={(e) => handleSubmit(e, formData)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Id
                    </Form.Label>
                    <Col sm={5}>
                    <Form.Control 
                        type="id" 
                        placeholder="Id"
                        value={formData.userId}
                        onChange={(e) => setFormData({...formData, userId: e.target.value})} 
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                    Password
                    </Form.Label>
                    <Col sm={5}>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={formData.userPw}
                        onChange={(e) => setFormData({...formData, userPw: e.target.value})} 
                    />
                    </Col>
                    {loginStatus === 'unpass' && (
                        <div className='mt-3' style={{ marginLeft: '150px' }}>
                        <span style={{ color: 'red' }}>{msg}</span>
                        </div>
                    )}
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
