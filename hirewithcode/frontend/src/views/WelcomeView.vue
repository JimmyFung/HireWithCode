<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <img src="../assets/logo.png" alt="Logo" class="logo" />
      <h1 class="welcome-text">欢迎来到 无限状态 线上面试环节，期待你的加入！</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // 2秒后自动跳转到面试引导页面
  setTimeout(() => {
    router.push('/guide')
  }, 2000)
})
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.welcome-content {
  text-align: center;
  color: white;
  animation: fadeIn 1s ease-in-out;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  animation: pulse 2s infinite;
}

.welcome-text {
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.4;
  margin: 0;
  max-width: 600px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 1.5rem;
  }
  
  .logo {
    width: 80px;
    height: 80px;
  }
}
</style>

