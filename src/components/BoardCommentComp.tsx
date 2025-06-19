import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, InputGroup, ListGroup } from 'react-bootstrap';
import useApi from '../apis/Api';
import { AuthContext } from '../auth/AuthContext';

interface Comment {
    comment_id?: number;
    board_id?: number;
    content?: string;
    user_nn?: string;
    crte_dtm?: string;
    parent_id?: number | null;
    children?: Comment[];
}

interface Props {
  boardId: number
}

const BoardCommentComp = ({ boardId }: Props) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState<Comment>({
    board_id: boardId,
    content: '',
    user_nn: '',
    parent_id: 0,
  });
  const [comments, setComments] = useState<Comment[]>([]);

  const onSubmit = (formData: Comment) => {
    if (user) {
      const confirmed = window.confirm("등록하시겠습니까?");
      if (!confirmed) return;
    } else {
      return alert('로그인 해주시기 바랍니다.');
    }
    useApi.post('/regComment', formData)
    .then(res => {
      alert("등록 완료");
      setFormData({ content: '' });
      getComment();
    })
    .catch(err => {
      alert("등록 실패 "+err);
    });
  };

  const getComment = () => {
    useApi.get<Comment[]>(`/getCommentList?boardId=${boardId}`)
    .then(res => setComments(res.data));
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <Card className="mt-4">
      <Card.Header>댓글</Card.Header>
      <Card.Body>
        {/* 댓글 입력창 */}
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="댓글을 입력하세요."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <Button variant="primary" onClick={() => onSubmit(formData)}>
            등록
          </Button>
        </InputGroup>

        {/* 댓글 리스트 */}
        <ListGroup variant="flush">
          {comments.length === 0 ? (
            <ListGroup.Item className="text-muted">댓글이 없습니다.</ListGroup.Item>
          ) : (
            comments.map((comment) => (
              <ListGroup.Item key={comment.comment_id}>
                <strong>{comment.user_nn}</strong> <small className="text-muted">{comment.crte_dtm}</small>
                <div>{comment.content}</div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default BoardCommentComp
