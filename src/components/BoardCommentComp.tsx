import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, ListGroup } from 'react-bootstrap';
import useApi from '../apis/Api';
import { AuthContext } from '../auth/AuthContext';
import CommentItem from './CommentItem';

interface Comment {
  comment_id: number;
  board_id: number;
  content: string;
  user_nn?: string;
  crte_dtm?: string;
  parent_id: number | null;
  comment_st_cd?: number;
  replies?: Comment[]; // 트리 구조를 위한 필드
}

interface Props {
  boardId: number;
}

const BoardCommentComp = ({ boardId }: Props) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    board_id: boardId,
    content: '',
    user_nn: '',
    parent_id: 0,
    comment_st_cd: 0,
  });

  const [comments, setComments] = useState<Comment[]>([]);

  const onSubmit = () => {
    if (!user) {
      alert('로그인 해주시기 바랍니다.');
      return;
    }
    if (!formData.content.trim()) {
      alert('내용을 입력하세요.');
      return;
    }
    const confirmed = window.confirm("등록하시겠습니까?");
    if (!confirmed) return;

    useApi.post('/regComment', formData)
      .then(() => {
        alert("등록 완료");
        setFormData({ ...formData, content: '' });
        getComment();
      })
      .catch(err => {
        alert("등록 실패 " + err);
      });
  };

  const getComment = () => {
    useApi.get<Comment[]>(`/getCommentList?boardId=${boardId}`)
      .then(res => {
        const tree = buildCommentTree(res.data);
        setComments(tree);
      });
  };

  const buildCommentTree = (flatComments: Comment[]): Comment[] => {
    const map = new Map<number, Comment & { replies: Comment[] }>();
    const roots: Comment[] = [];

    flatComments.forEach(comment => {
      map.set(comment.comment_id, { ...comment, replies: [] });
    });

    flatComments.forEach(comment => {
      if (!comment.parent_id || comment.parent_id === 0) {
        roots.push(map.get(comment.comment_id)!);
      } else {
        const parent = map.get(comment.parent_id);
        if (parent) parent.replies!.push(map.get(comment.comment_id)!);
      }
    });

    return roots;
  };

  const renderComments = (list: Comment[], depth = 0): React.ReactNode => {
    return list.map(comment => (
      <div
        key={comment.comment_id}
        className={`mb-3 ${depth > 0 ? 'ms-4 ps-3 border-start border-2 border-secondary-subtle bg-light' : ''}`}
      >
        <CommentItem comment={comment} onRefresh={getComment} />
        {comment.replies && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };



  useEffect(() => {
    getComment();
  }, [boardId]);

  return (
    <Card className="mt-4">
      <Card.Header className="bg-light fw-bold">댓글</Card.Header>
      <Card.Body>
        <Form>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="댓글을 입력하세요."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <Button variant="primary" onClick={onSubmit}>
              등록
            </Button>
          </InputGroup>
        </Form>
        <hr />
        {/* 댓글 리스트 */}
        <ListGroup variant="flush">
          {comments.length === 0 ? (
            <ListGroup.Item className="text-muted">댓글이 없습니다.</ListGroup.Item>
          ) : (
            renderComments(comments)
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default BoardCommentComp;
