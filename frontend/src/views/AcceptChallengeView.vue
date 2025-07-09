<template>
  <div class="accept-container">
    <div class="accept-content">
      <div class="header">
        <h1>接受挑战</h1>
        <p>请填写您的基本信息来开始这个挑战</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="challenge-form">
        <div class="form-group">
          <label for="githubId">GitHub ID</label>
          <input
            id="githubId"
            v-model="formData.githubId"
            type="text"
            placeholder="请输入您的 GitHub 用户名"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">邮箱地址</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="请输入您的邮箱地址"
            required
          />
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? '提交中...' : '接受挑战' }}
        </button>
      </form>
      
      <div class="navigation">
        <button @click="goBack" class="back-btn">← 返回</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)

const formData = reactive({
  githubId: '',
  email: ''
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里应该调用后端 API 保存用户信息
    console.log('提交的数据:', formData)
    
    // 跳转到提交挑战页面
    router.push('/submit')
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/guide')
}
</script>

<style scoped>
.accept-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accept-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 500px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2rem;
}

.header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.challenge-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.navigation {
  text-align: center;
}

.back-btn {
  background: transparent;
  color: #7f8c8d;
  border: 1px solid #e1e8ed;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #f8f9fa;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .accept-content {
    padding: 30px 20px;
    margin: 0 10px;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
}
</style>

