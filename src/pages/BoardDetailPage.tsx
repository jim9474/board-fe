import React, { useEffect, useState } from 'react'
import type { Board } from '../components/BoardListComp'
import { useParams } from 'react-router-dom'
import useApi from '../apis/Api'
import { useNavigate } from 'react-router-dom'

const BoardDetailPage = () => {
    const { board_id } = useParams<{ board_id: string }>();
    const boardIdNumber = board_id ? Number(board_id) : null;

    const [board, setBoard] = useState<Board | null>(null);
    const navigate = useNavigate();

    const onCancel = () => {
        navigate(-1);
    };

    const onDel = (id: number | null) => {
        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmed) return;

        useApi.post('/deleteBoard', {id})
        .then(res => {
            alert('삭제 성공');
            navigate("/");
        })
        .catch(err => {
            alert('삭제 실패');
            console.log('삭제 실패', err);
        });
    };

    useEffect(() => {
        useApi.get<Board>(`/getBoardDetail?boardId=${boardIdNumber}`)
        .then(res => {
            setBoard(res.data);
            console.log('조회 성공');
        })
        .catch(err => {
            console.log('조회 실패', err);
        });
    }, []);

    return (
        <div className='detail'>
            <hr/>
            <div className='detailTitle'>
                <span>{ board?.board_title }</span>
            </div>
            <hr/>
            <div className='detailText'>
                <span>{ board?.board_text }</span>
            </div>
            <div className='form_btn_group'>
                <button onClick={onCancel}>목록</button>
                <button onClick={() => onDel(boardIdNumber)}>삭제</button>
            </div>
        </div>
    )
}

export default BoardDetailPage
