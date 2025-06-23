import React, { useState } from 'react';
import useApi from '../apis/Api';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface BoardProps {
  board: Board;
}

export interface Board {
  board_id: number;
  board_title: string;
  board_text: string;
  board_read_cnt: number;
  board_div_cd: string;
  crte_user: string;
}

const BoardListComp = ({ board: b }: BoardProps) => {
  const [boardReadCnt, setBoardReadCnt] = useState(b.board_read_cnt);

  const addCnt = (boardId: number) => {
    useApi.post("/addReadCnt", { boardId })
      .then(() => {
        console.log("조회수 증가 성공");
        setBoardReadCnt(prev => prev + 1);
      })
      .catch(err => {
        console.log("조회수 증가 실패", err);
      });
  };

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title className="h6 mb-0">
              <Link
                to={`/detail/${b.board_id}`}
                className="text-decoration-none text-dark"
                onClick={() => addCnt(b.board_id)}
              >
                {b.board_title}
              </Link>
            </Card.Title>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary">조회수 {boardReadCnt}</Badge>
          </Col>
        </Row>
        <Card.Text className="mt-2 text-muted">
          작성자: {b.crte_user} | 분류: {b.board_div_cd}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BoardListComp;
