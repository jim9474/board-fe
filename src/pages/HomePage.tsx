import React, { useEffect, useState } from 'react'
import useApi from '../apis/Api'
import type { Board } from '../components/BoardListComp'
import BoardListComp from '../components/BoardListComp'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<Board[]>([]);
    const getToken = localStorage.getItem('token');
    const [user, setUser] = useState(null);

    const boardCreate = () => {
        if (getToken) {
            navigate('/create');
        } else {
            navigate('/login')
        }
    };
    
    useEffect(() => {
        useApi.get<Board[]>("/getAllBoardList")
        .then(res => setBoards(res.data));

        const token = localStorage.getItem('token');
        if (token) {
            useApi.get('/auth/me')
            .then(res => {
                setUser(res.data); // 유효한 사용자
            })
            .catch(() => {
                setUser(null); // 토큰 만료 등으로 인증 실패
                localStorage.clear();
            });
        }
    }, []);    

    return (
        <div className='list'>
            <h4 className="">전체</h4>
            <hr/>
            <ul>
            {boards.map(board => (
                <BoardListComp board={board} key={board.board_id}/>
            ))}
            </ul>
            <button onClick={boardCreate}>글 등록</button>
        </div>
    )
}

export default HomePage
