import React from 'react';
import axios from 'axios';


const useApi = axios.create({
  baseURL: "/api", // proxy 설정으로 인해 /api로 시작하면 Spring으로 전달됨
  withCredentials: true, // 백엔드에서 allowCredentials 설정했을 때
});

export default useApi
