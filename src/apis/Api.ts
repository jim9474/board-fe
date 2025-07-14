import React from 'react';
import axios from 'axios';

// 토큰을 localStorage에서 가져와 헤더에 자동으로 추가
const useApi = axios.create({
  baseURL: "/api", // proxy 설정으로 인해 /api로 시작하면 Spring으로 전달됨
  withCredentials: true, // 백엔드에서 allowCredentials 설정했을 때
});

// 요청 인터셉터 추가
useApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 토큰 만료 시 자동 로그아웃 or 로그인 페이지로 리다이렉트
useApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // 인증 오류(토큰 만료 또는 잘못됨)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 로그인 페이지로 강제 이동
      const path = window.location.pathname;
      if (path !== '/login') {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default useApi
