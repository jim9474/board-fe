import React, { useContext, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import useApi from '../apis/Api';
import { AuthContext } from '../auth/AuthContext';

interface Comment {
  comment_id?: number;
  user_nn?: string;
  crte_dtm?: string;
  content?: string;
  crte_user?: string;
  comment_st_cd? : number;
  board_id?: number;
  formatted_dtm?: string;
}

interface Props {
  comment: Comment;
  onRefresh: () => void;
}

const CommentItem = ({ comment, onRefresh }: Props) => {
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { user } = useContext(AuthContext);

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      useApi.post('/deleteComment', { id: comment.comment_id })
        .then(() => {
          alert('삭제 완료');
          onRefresh();
        })
        .catch(err => {
          console.log('댓글 삭제 실패', err);
        });
    }
  };

  const handleReplySubmit = () => {
    if (user) {
      if (replyContent.trim() === '') {
        alert('내용을 입력하세요.');
        return;
      }
      const confirmed = window.confirm("등록하시겠습니까?");
      if (!confirmed) return;
    } else {
      return alert('로그인 해주시기 바랍니다.');
    }
    useApi.post('/regComment', {
      board_id: comment.board_id,
      content: replyContent,
      user_nn: comment.user_nn,
      parent_id: comment.comment_id,
      comment_st_cd: 0,
      })
      .then(() => {
        setReplyContent('');
        setShowReply(false);
        onRefresh();
      })
      .catch(err => {
        console.log('답글 등록 실패', err);
      });
  };

  return (
    <ListGroup.Item>
      { (comment?.comment_st_cd === 0) ? (
        <>
        <div className="d-flex justify-content-between">
          <div>
            <strong>{comment.user_nn}</strong>{' '}
            <small className="text-muted">{comment.formatted_dtm}</small>
          </div>
          <div className="d-flex gap-2">
            {user?.userId === comment.crte_user && (
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>삭제</Button>
            )}
            <Button variant="outline-secondary" size="sm" onClick={() => setShowReply(!showReply)}>
              답글
            </Button>
          </div>
        </div>
        <div className="mt-2">{comment.content}</div>
        </>
      ) : (
        <div>=========== 삭제된 댓글입니다 ===========</div>
      )}

      {showReply && (
        <div className="mt-2">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="답글을 입력하세요..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="mt-1 text-end">
            <Button
              variant="primary"
              size="sm"
              onClick={handleReplySubmit}
            >
              등록
            </Button>
          </div>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default CommentItem;
