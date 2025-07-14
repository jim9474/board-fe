// hooks/useLoginForm.ts
import { useState } from 'react';
import useApi from '../apis/Api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import type { User } from '../auth/AuthContext';

export const useLoginForm = () => {
  const [formData, setFormData] = useState<User>({
    userId: '',
    userPw: '',
  });

  const [status, setStatus] = useState<'pass' | 'unpass' | null>(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const isValid = (data: User) =>
    data.userId.trim() !== '' && data.userPw.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // 🔥 꼭 필요!
    if (!isValid(formData)) return;

    useApi
      .post('/login', formData)
      .then(res => {
        const { token, user } = res.data;
        login(token, user);
        setStatus('pass');
        navigate('/');
      })
      .catch(err => {
        setStatus('unpass');
        setMsg(err.response?.data?.message || '로그인 실패');
      });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    status,
    msg,
  };
};
