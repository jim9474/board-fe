import React ,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Board } from '../components/BoardListComp';
import useApi from '../apis/Api';
import BoardListComp from '../components/BoardListComp';

const StreamingBoardListPage = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<Board[]>([]);
    const getToken = localStorage.getItem('token');

    const boardCreate = () => {
        if (getToken) {
            navigate('/create');
        } else {
            navigate('/login')
        }
    };
    
    useEffect(() => {
        useApi.get<Board[]>("/getStreamingBoardList")
        .then(res => setBoards(res.data));
    }, []);    

    return (
        <div className='list'>
            <h4 className="">방송</h4>
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

export default StreamingBoardListPage
