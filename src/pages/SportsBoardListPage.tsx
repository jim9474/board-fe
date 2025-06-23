import React ,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Board } from '../components/BoardListComp';
import useApi from '../apis/Api';
import BoardListComp from '../components/BoardListComp';
import { Button, Container } from 'react-bootstrap';

const SportsBoardListPage = () => {
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
        useApi.get<Board[]>("/getSportsBoardList")
        .then(res => setBoards(res.data));
    }, []);    

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">스포츠</h4>
                <Button variant="primary" onClick={boardCreate}>글 등록</Button>
            </div>
            <hr />
            <div>
                {boards.length > 0 ? (
                    boards.map(board => (
                        <BoardListComp board={board} key={board.board_id} />
                    ))
                ) : (
                    <p className="text-muted">등록된 게시글이 없습니다.</p>
                )}
            </div>
        </Container>
    );
}

export default SportsBoardListPage
