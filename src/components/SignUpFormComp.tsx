import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
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
        if (formData.userId.trim() === '' || formData.userId === res.data.user_id) {
          setIdStatus('invalid');
        } else {
          setIdStatus('valid');
        }
      })
      .catch(err => console.log(err));
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

    if (isValidForm(formData)) {
      useApi.post('/createUser', formData)
        .then(() => {
          alert("가입 완료");
          navigate("/");
        })
        .catch(err => alert('가입 실패 ' + err));
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  return (
    <>
      <h2 className='signup text-center mb-4'>회원가입</h2>
      <Form className='mx-auto w-50 p-4 border rounded shadow-sm bg-light' onSubmit={(e) => handleSubmit(e, formData)}>
        
        {/* ID 입력 + 중복확인 */}
        <Form.Group className='mb-3' controlId="formGridId">
          <Form.Label>ID</Form.Label>
          <InputGroup>
            <Form.Control
              placeholder="ID를 입력하세요"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            />
            <Button variant="outline-secondary" onClick={handleIdCheck}>
              중복확인
            </Button>
          </InputGroup>
          {idStatus === 'valid' && (
            <div className="mt-1 text-success">✔ 사용이 가능합니다.</div>
          )}
          {idStatus === 'invalid' && (
            <div className="mt-1 text-danger">✘ 사용이 불가능합니다.</div>
          )}
        </Form.Group>

        {/* 비밀번호 */}
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.userPw}
            onChange={(e) => setFormData({ ...formData, userPw: e.target.value })}
          />
        </Form.Group>

        {/* 비밀번호 확인 */}
        <Form.Group className="mb-3" controlId="formGridConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPw}
            onChange={(e) => setFormData({ ...formData, confirmPw: e.target.value })}
          />
          {isFilled && (
            <div className="mt-1" style={{ color: isMatch ? 'green' : 'red' }}>
              {isMatch ? '✔ 비밀번호가 동일합니다.' : '✘ 비밀번호가 동일하지 않습니다.'}
            </div>
          )}
        </Form.Group>

        {/* 이메일 */}
        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="aa123@naver.com ..."
            value={formData.userEmail}
            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
          />
        </Form.Group>

        {/* 닉네임 */}
        <Form.Group className="mb-4" controlId="formGridNickName">
          <Form.Label>NickName</Form.Label>
          <Form.Control
            placeholder="NickName을 입력하세요"
            value={formData.userNn}
            onChange={(e) => setFormData({ ...formData, userNn: e.target.value })}
          />
        </Form.Group>

        {/* 버튼 */}
        <div className='text-center'>
          <Button variant="primary" type="submit" className='px-5'>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignUpFormComp;
