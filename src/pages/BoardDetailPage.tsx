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
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

interface VoteType {
    unCnt: number;
    downCnt: number;
}

const BoardDetailPage = () => {
    const { board_id } = useParams<{ board_id: string }>();
    const boardIdNumber = board_id ? Number(board_id) : null;
    const { user } = useContext(AuthContext);
    const [board, setBoard] = useState<Board | null>(null);
    const navigate = useNavigate();
    const [voteStatus, setVoteStatus] = useState<'UP' | 'DOWN' | null>(null);
    const [voteCount, setVoteCount] = useState({ UP: 0, DOWN: 0 });

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

    const handleVote = (type: 'UP' | 'DOWN') => {
        if (!user) return alert("로그인이 필요합니다.");

        useApi.post('/voteBoard', {
            boardId: boardIdNumber,
            userId: user.userId,
            voteType: type
        })
        .then(() => {
            // 다시 상태 새로고침
            return Promise.all([
                useApi.get(`/getVoteStatus?boardId=${boardIdNumber}&userId=${user.userId}`),
                useApi.get(`/getVoteCount?boardId=${boardIdNumber}`)
            ]);
        })
        .then(([statusRes, countRes]) => {
            setVoteStatus(statusRes.data);
            setVoteCount({
                UP: countRes.data.upCnt,
                DOWN: countRes.data.downCnt
            });
        })
        .catch(err => {
            // console.error('투표 실패', err);
            alert("처리 중 오류 발생");
        });
    };

    useEffect(() => {
        if (boardIdNumber !== null) {
            useApi.get<Board>(`/getBoardDetail?boardId=${boardIdNumber}`)
                .then(res => setBoard(res.data))
                .catch(err => console.log('조회 실패', err));

            useApi.get(`/getVoteStatus?boardId=${boardIdNumber}&userId=${user?.userId}`)
            .then(res => setVoteStatus(res.data));

            useApi.get(`/getVoteCount?boardId=${boardIdNumber}`)
            .then(res => {
                console.log(res.data);
                setVoteCount({
                    UP: res.data.upCnt,
                    DOWN: res.data.downCnt
                });
            });
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
                    <Row className="mt-3 mb-2 justify-content-center text-center">
                        <Col xs="auto" className="d-flex gap-4 align-items-center">
                            {/* 추천 */}
                            <div className="d-flex align-items-center gap-2">
                                <FaThumbsUp
                                    size={24}
                                    color={voteStatus === 'UP' ? 'blue' : 'gray'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleVote('UP')}
                                />
                                <span>{voteCount.UP}</span>
                            </div>

                            {/* 비추천 */}
                            <div className="d-flex align-items-center gap-2">
                                <FaThumbsDown
                                    size={24}
                                    color={voteStatus === 'DOWN' ? 'red' : 'gray'}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleVote('DOWN')}
                                />
                                <span>{voteCount.DOWN}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        {/* <Col className='mt-3 mb-2 justify-content-center text-center' xs="auto">
                            <FaThumbsUp
                                size={24}
                                color={voteStatus === 'up' ? 'blue' : 'gray'}
                                style={{ cursor: 'pointer', marginRight: '8px' }}
                                onClick={() => handleVote('up')}
                            />
                            <span className="me-3">{voteCount.up}</span>

                            <FaThumbsDown
                                size={24}
                                color={voteStatus === 'down' ? 'red' : 'gray'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleVote('down')}
                            />
                            <span>{voteCount.down}</span>
                        </Col> */}
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
