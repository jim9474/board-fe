import React, { useEffect, useState } from 'react'
import useApi from '../apis/Api'
import type { Board } from '../components/BoardListComp'
import BoardListComp from '../components/BoardListComp'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<Board[]>([]);

    const boardCreate = () => {
        navigate('/create');
    };
    
    useEffect(() => {
        useApi.get<Board[]>("/getAllBoardList")
        .then(res => setBoards(res.data));
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
