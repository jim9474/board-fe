import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../apis/Api';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface BoardCreateInfo {
    boardTitle: string;
    boardDivCd: string;
    boardText: string;
}

const BoardCreateComp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<BoardCreateInfo>({
        boardTitle: '',
        boardDivCd: '',
        boardText: '',
    });

    const onCancel = () => navigate(-1);

    const isValidForm = (data: BoardCreateInfo) => {
        return (
            data.boardTitle.trim() !== '' &&
            data.boardDivCd.trim() !== '' &&
            data.boardText.trim() !== ''
        );
    };

    const onsubmit = (formData: BoardCreateInfo) => {
        if (!isValidForm(formData)) {
            alert('모든 입력 항목을 채워주세요.');
            return;
        }
        useApi.post('/createBoard', formData)
            .then(() => {
                console.log('등록 성공');
                navigate("/");
            })
            .catch(err => {
                console.log('등록 실패', err);
            });
    };

    return (
        <Container className="mt-5">
            <div className="border rounded shadow-sm p-4">
                <h4 className="mb-4 fw-bold">게시글 등록</h4>

                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={formData.boardTitle}
                        onChange={(e) =>
                            setFormData({ ...formData, boardTitle: e.target.value })
                        }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>카테고리</Form.Label>
                    <Form.Select
                        value={formData.boardDivCd}
                        onChange={(e) =>
                            setFormData({ ...formData, boardDivCd: e.target.value })
                        }
                    >
                        <option value="">선택하세요</option>
                        <option value="game">게임</option>
                        <option value="streaming">방송</option>
                        <option value="politics">정치</option>
                        <option value="sports">스포츠</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>내용</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder="내용을 입력하세요"
                        value={formData.boardText}
                        onChange={(e) =>
                            setFormData({ ...formData, boardText: e.target.value })
                        }
                        style={{ whiteSpace: 'pre-wrap' }}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <ButtonGroup>
                        <Button variant="secondary" onClick={onCancel}>취소</Button>
                        <Button variant="primary" onClick={() => onsubmit(formData)}>등록</Button>
                    </ButtonGroup>
                </div>
            </div>
        </Container>
    );
};

export default BoardCreateComp;
