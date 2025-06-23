import React, { useEffect, useState, useContext } from 'react';
import type { Board } from '../components/BoardListComp';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../apis/Api';
import { AuthContext } from '../auth/AuthContext';
import BoardCommentComp from '../components/BoardCommentComp';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const BoardDetailPage = () => {
    const { board_id } = useParams<{ board_id: string }>();
    const boardIdNumber = board_id ? Number(board_id) : null;
    const { user } = useContext(AuthContext);
    const [board, setBoard] = useState<Board | null>(null);
    const navigate = useNavigate();

    const onCancel = () => navigate(-1);

    const onDel = (id: number | null) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            useApi.post('/deleteBoard', { id })
                .then(() => {
                    alert('삭제 성공');
                    navigate("/");
                })
                .catch(err => {
                    alert('삭제 실패');
                    console.log('삭제 실패', err);
                });
        }
    };

    useEffect(() => {
        if (boardIdNumber !== null) {
            useApi.get<Board>(`/getBoardDetail?boardId=${boardIdNumber}`)
                .then(res => setBoard(res.data))
                .catch(err => console.log('조회 실패', err));
        }
    }, [boardIdNumber]);

    return (
        <Container className="mt-5">
            {board && (
                <div className="border rounded shadow-sm p-4">
                    <Row className="mb-2">
                        <Col>
                            <h4 className="fw-bold">{board.board_title}</h4>
                        </Col>
                    </Row>
                    <Row className="mb-3 text-muted small">
                        <Col>
                            작성자: {board.crte_user} | 분류: {board.board_div_cd} | 조회수: {board.board_read_cnt}
                        </Col>
                    </Row>
                    <Row className='detailText'>
                        <Col>
                            <div style={{ whiteSpace: 'pre-wrap' }}>{board.board_text}</div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-end">
                            <ButtonGroup>
                                <Button variant="secondary" onClick={onCancel}>목록</Button>
                                {user?.userId === board.crte_user && (
                                    <Button variant="danger" onClick={() => onDel(boardIdNumber)}>삭제</Button>
                                )}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </div>
            )}

            {board?.board_id !== undefined && (
                <div className="mt-4">
                    <BoardCommentComp boardId={board.board_id} />
                </div>
            )}
        </Container>
    );
};

export default BoardDetailPage;
