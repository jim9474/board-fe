// src/components/UserEditModal.tsx

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import useApi from '../apis/Api';

interface userEditInfo {
    userId: string;
    userNn?: string;
    userEmail?: string;
    userPw?: string;
}

type Props = {
    show: boolean;
    onHide: () => void;
    user: userEditInfo;
};

const UserEditModal: React.FC<Props> = ({ show, onHide, user }) => {
    const [formData, setFormData] = useState({
        userId: user.userId,
        userNn: '',
        userEmail: '',
        userPw: '',
    });

    const isValidForm = (data: userEditInfo) => {
        return (
            data.userNn?.trim() !== '' &&
            data.userEmail?.trim() !== ''
        );
    };

    const handleSubmit = (formData: userEditInfo) => {
        // TODO: 실제 API 요청 보내기
        if(!isValidForm(formData)) {
            alert("필수 항목을 입력해주세요.");
            return;
        }

        const confirmed = window.confirm("변경하시겠습니까?");
        if (!confirmed) return;
        
        useApi.post('/editUserInfo', formData)
            .then(() => {
                alert('저장되었습니다.');
                onHide();
            })
            .catch(err => {
                alert('관리자한테 문의하세요. [에러]'+err);
            });
    };

    useEffect(() => {
        useApi.get(`/getUserInfo?userId=${user.userId}`)
        .then(res => {
            console.log(res.data);
            setFormData({ 
                ...formData, 
                userNn: res.data.user_nn,
                userEmail: res.data.user_email,
                userPw: ''
            });
        });
    }, [show]);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>회원정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control type="text" value={user.userId} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.userNn}
                            onChange={(e) => setFormData({ ...formData, userNn: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.userEmail}
                            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호 변경 (선택)</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.userPw}
                            onChange={(e) => setFormData({ ...formData, userPw: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>닫기</Button>
                <Button variant="primary" onClick={() => handleSubmit(formData)}>저장</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserEditModal;
