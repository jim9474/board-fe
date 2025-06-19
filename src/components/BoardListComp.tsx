import React, { useEffect, useState } from 'react'
import useApi from '../apis/Api'
import { Link } from 'react-router-dom';

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

const BoardListComp = ({board: b}:BoardProps) => {
    const [board, setBoard] = useState(b);
    const [boardReadCnt, setBoardReadCnt] = useState(b.board_read_cnt);
    
    const addCnt = (boardId: number) => {
        useApi.post("/addReadCnt", {boardId})
        .then(res => {
            console.log("조회수 증가 성공");
            setBoardReadCnt(prev => prev + 1);
        })
        .catch(err => {
            console.log("조회수 증가 실패", err);
        });
    }

    return (
        <li key={board.board_id}>
            <Link to={`/detail/${board.board_id}`} onClick={() => addCnt(board.board_id)}>{board.board_title} [{boardReadCnt}]</Link>
        </li>
    )
}

export default BoardListComp
