import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../apis/Api';

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

    const onCancel = () => {
        navigate(-1);
    };

    const onsubmit = (formData: BoardCreateInfo) => {
        console.log('formData >>> ', formData);
        useApi.post('/createBoard', formData)
        .then(res => {
            console.log('등록 성공');
            navigate("/");
        })
        .catch(err => {
            console.log('등록 실패', err);
        });
    };

    return (
        <div className='list'>
        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">제목</InputGroup.Text>
            <Form.Control
                placeholder="제목을 입력하세요."
                aria-label="제목을 입력하세요."
                aria-describedby="basic-addon1"
                value={formData.boardTitle}
                onChange={(e) =>
                    setFormData({...formData, boardTitle: e.target.value})
                }
            />
        </InputGroup>

        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">카테고리</InputGroup.Text>
            <Form.Control
                as="select"
                aria-label="카테고리 선택"
                aria-describedby="basic-addon1"
                value={formData.boardDivCd}
                onChange={(e) =>
                    setFormData({...formData, boardDivCd: e.target.value})
                }
            >
                <option value="">선택하세요.</option>
                <option value="game">게임</option>
                <option value="streaming">방송</option>
                <option value="politics">정치</option>
                <option value="sports">스포츠</option>
            </Form.Control>
        </InputGroup>

        <InputGroup>
            <InputGroup.Text>내용</InputGroup.Text>
            <Form.Control 
                as="textarea"
                placeholder="내용을 입력하세요." 
                aria-label="With textarea"
                style={{ height: '400px'}}
                value={formData.boardText}
                onChange={(e) =>
                    setFormData({...formData, boardText: e.target.value})
                } 
            />
        </InputGroup>
        <div className='form_btn_group'>
            <button onClick={onCancel}>취소</button>
            <button onClick={() => onsubmit(formData)}>등록</button>
        </div>
        </div>
    )
}

export default BoardCreateComp
