import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import useApi from '../apis/Api';
import { useNavigate } from 'react-router-dom';

export interface UserCreateInfo {
    userId: string;
    userPw: string;
    userEmail?: string;
    userNn?: string;
    confirmPw?: string;
}

const SignUpFormComp = () => {
    const [idStatus, setIdStatus] = useState<'valid' | 'invalid' | null>(null);
    const [formData, setFormData] = useState<UserCreateInfo>({
        userId: '',
        userPw: '',
        userEmail: '',
        userNn: '',
        confirmPw: ''
    });
    const isFilled = formData.userPw && formData.confirmPw;
    const isMatch = formData.userPw === formData.confirmPw;
    const navigate = useNavigate();

    const handleIdCheck = () => {
        useApi.get(`/getCheckId?userId=${formData.userId}`)
        .then(res => {
            console.log('userId >>> ', res.data.user_id);
            if (formData.userId.trim() === '' || formData.userId === res.data.user_id) {
                setIdStatus('invalid');
            } else {
                setIdStatus('valid');
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const isValidForm = (data: UserCreateInfo) => {
        return (
            idStatus === 'valid' &&
            data.userPw.trim() !== '' &&
            data.userEmail?.trim() !== '' &&
            data.userNn?.trim() !== '' &&
            isMatch
        );
    };

    const handleSubmit = (e: React.FormEvent, formData: UserCreateInfo) => {
        e.preventDefault();
        const confirmed = window.confirm("가입하시겠습니까?");
        if (!confirmed) return;

        console.log('formData >>> ', formData);
        if (isValidForm(formData)) {
            useApi.post('/createUser', formData)
            .then(res => {
                alert("가입 완료");
                navigate("/");
            })
            .catch(err => {
                alert('가입 실패 '+err);
            });
        } else {
            alert("모든 항목을 입력해주세요.");
        }

    };

    return (
        <>
        <h2 className='signup'>회원가입</h2>
        <Form className='list mx-auto w-50' onSubmit={(e) => handleSubmit(e, formData)}>
            <Form.Group className='mb-3' controlId="formGridId">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                    placeholder="ID를 입력하세요"
                    value={formData.userId}
                    onChange={(e) => setFormData({...formData, userId: e.target.value})} 
                />
                <Row className="">  
                    <Col xs="auto">
                        <button type='button' onClick={handleIdCheck}>중복확인</button>
                    </Col>
                    <Col>
                        {idStatus === 'valid' && (
                            <span style={{ color: 'green' }}>✔ 사용이 가능합니다.</span>
                        )}
                        {idStatus === 'invalid' && (
                            <span style={{ color: 'red' }}>✘ 사용이 불가능합니다.</span>
                        )}
                    </Col>
                </Row>    
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    value={formData.userPw}
                    onChange={(e) => setFormData({...formData, userPw: e.target.value})} 
                />
            </Form.Group>
            

            <Form.Group className="mb-3" controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password"
                    value={formData.confirmPw}
                    onChange={(e) => setFormData({...formData, confirmPw: e.target.value})} 
                />
                {isFilled && (
                    <span style={{ color: isMatch ? 'green' : 'red'}}>
                        {isMatch ? '✔ 비밀번호가 동일합니다.' : '✘ 비밀번호가 동일하지 않습니다.'}
                    </span>
                )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder="aa123@naver.com ..."
                    value={formData.userEmail}
                    onChange={(e) => setFormData({...formData, userEmail: e.target.value})} 
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group className='' controlId="formGridNickName">
                    <Form.Label>NickName</Form.Label>
                    <Form.Control 
                        placeholder="NickName을 입력하세요"
                        value={formData.userNn}
                        onChange={(e) => setFormData({...formData, userNn: e.target.value})} 
                    />
                </Form.Group>
            </Row>   
            <div className='form_btn_group'>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </div>
        </Form>
        </>
    );
}

export default SignUpFormComp
