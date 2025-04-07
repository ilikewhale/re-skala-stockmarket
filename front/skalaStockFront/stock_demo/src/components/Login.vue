<script setup>
import { ref, provide  } from 'vue';
import { useRouter } from 'vue-router';
import Axios from 'axios';

const router = useRouter();
const playerId = ref('');
const playerPw = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const signin = async () => {
  if (!playerId.value || !playerPw.value) {
    errorMessage.value = 'ID와 비밀번호를 모두 입력해주세요.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';
  
  const url = `/api/player/${playerId.value}/login`;
  const requestBody = { playerPassword: playerPw.value };
  
  try {
    const response = await Axios.post(url, requestBody);
    if (response.data) {
      alert('로그인 성공!');
      router.push({ path: '/home', query: { playerId: playerId.value } });
    } else {
      errorMessage.value = '아이디 또는 비밀번호가 일치하지 않습니다.';
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = '사용자를 찾을 수 없습니다. 회원 가입을 진행해주세요.';
  } finally {
    isLoading.value = false;
  }
};

const signup = () => {
    console.log('회원가입 페이지로 이동');
    router.push('/signup');
}
</script>

<template>
  <div class="stock-container">
    <div class="stock-card">
      <div class="logo-area">
        <h2 class="stock-title">Stock Market</h2>
        <p class="subtitle">Welcome back!</p>
      </div>
      
      <form @submit.prevent="signin" class="login-form">
        <div class="stock-group">
          <label for="player-id">ID</label>
          <div class="input-container">
            <input 
              id="player-id"
              type="text" 
              v-model="playerId" 
              placeholder="Enter your ID"
              autocomplete="username">
          </div>
        </div>
        
        <div class="stock-group">
          <label for="player-pw">Password</label>
          <div class="input-container">
            <input 
              id="player-pw"
              type="password" 
              v-model="playerPw" 
              placeholder="Enter your password"
              autocomplete="current-password">
          </div>
        </div>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        
        <button 
          type="submit" 
          class="signin-btn" 
          :disabled="isLoading">
          {{ isLoading ? '로그인 중...' : '로그인' }}
        </button>
        
        <div class="action-links">
            <router-link to="/findpw" class="forgot-link">비밀번호를 잊으셨나요?</router-link>
        </div>

        <div class="action-links">
            <router-link to="/findconfirmation" class="forgot-link">확인 문자를 잊으셨나요?</router-link>
        </div>
      </form>
      
      <div class="signup-area">
        <p>계정이 없으신가요?</p>
        <button class="signup-btn" @click="signup">회원가입</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
}

.stock-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo-area {
  margin-bottom: 2rem;
}

.stock-title {
  font-size: 28px;
  color: #1a56db;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 16px;
}

.login-form {
  margin-bottom: 1.5rem;
}

.stock-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

.stock-group label {
  display: block;
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.stock-group input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.stock-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.stock-group input::placeholder {
  color: #9ca3af;
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  text-align: left;
  margin-bottom: 1rem;
}

.signin-btn {
  width: 100%;
  padding: 12px;
  background: #1a56db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1rem;
}

.signin-btn:hover {
  background: #1e40af;
}

.signin-btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.action-links {
  text-align: center;
  margin-bottom: 1rem;
}

.forgot-link {
  color: #4b5563;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-link:hover {
  color: #1a56db;
  text-decoration: underline;
}

.signup-area {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  margin-top: 1rem;
}

.signup-area p {
  color: #4b5563;
  font-size: 14px;
  margin-bottom: 0.75rem;
}

.signup-btn {
  width: 100%;
  padding: 12px;
  background: white;
  color: #1a56db;
  border: 1px solid #1a56db;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.signup-btn:hover {
  background: #eef2ff;
}

@media (max-width: 480px) {
  .stock-card {
    max-width: 90%;
    padding: 1.5rem;
  }
}
</style>