<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Axios from 'axios';

const router = useRouter();
const playerId = ref('');
const password = ref('');

const isLoading = ref(false);
const errorMessage = ref('');

const findconfirmation = async () => {
    if (!playerId.value || !password.value) {
        errorMessage.value = '모든 필드를 입력해주세요.'
        return
    }

    isLoading.value = true;
    errorMessage.value = '';

    const url = `/api/player/${playerId.value}/confirmation`;
    const requestBody = {
        "playerPw" : password.value   
    }

    try {
    const response = await Axios.post(url, requestBody);
    if (response.data) {
      alert(`확인 문자 : ${response.data.confirmation}`);
      router.push('/'); 
    } 
  } catch (error) {
    console.error('Signup error:', error);
    errorMessage.value = '아이디나 비밀번호를 다시 확인해주세요.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="stock-container">
    <div class="stock-card">
      <div class="logo-area">
        <h2 class="stock-title">Stock Market</h2>
        <p class="subtitle">확인 문자 찾기</p>
      </div>

      <form @submit.prevent="findconfirmation" class="login-form">
        <div class="stock-group">
          <label for="player-id">ID</label>
          <div class="input-container">
            <input 
              id="player-id"
              type="text" 
              v-model="playerId" 
              placeholder="ID를 입력하세요"
              autocomplete="username">
          </div>
        </div>

        <div class="stock-group">
          <label for="confirmation">Password</label>
          <div class="input-container">
            <input 
              id="player-password"
              type="password" 
              v-model="password" 
              placeholder="비밀번호를 입력하세요"
              autocomplete="current-password">
          </div>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button 
          type="submit" 
          class="search-btn" 
          :disabled="isLoading">
          {{ isLoading ? '확인 문자 찾는 중...' : '확인 문자 찾기' }}
        </button>

        <button @click="router.back()" class="home-btn">이전으로</button>
      </form>
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
  width: 400px;
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
  align-items: left;
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

.search-btn {
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

.home-btn {
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

.home-btn:hover {
  background: #1e40af;
}

@media (max-width: 480px) {
  .stock-card {
    max-width: 90%;
    padding: 1.5rem;
  }
}
</style>
