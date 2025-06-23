import React, { useEffect, useState } from 'react';
import useApi from '../apis/Api';
import type { Board } from '../components/BoardListComp';
import BoardListComp from '../components/BoardListComp';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState<Board[]>([]);
    const getToken = localStorage.getItem('token');
    const [user, setUser] = useState(null);

    const boardCreate = () => {
        if (getToken) {
            navigate('/create');
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    };

    useEffect(() => {
        useApi.get<Board[]>("/getAllBoardList")
            .then(res => setBoards(res.data));

        const token = localStorage.getItem('token');
        if (token) {
            useApi.get('/auth/me')
                .then(res => {
                    setUser(res.data);
                })
                .catch(() => {
                    setUser(null);
                    localStorage.clear();
                });
        }
    }, []);

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">전체 게시글</h4>
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
};

export default HomePage;
