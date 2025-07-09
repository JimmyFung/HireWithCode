<template>
  <div class="submit-container">
    <div class="submit-content">
      <div class="header">
        <h1>提交挑战</h1>
        <p>恭喜您完成挑战！请提交您的作品链接</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="submit-form">
        <div class="form-group">
          <label for="repoUrl">GitHub 仓库 URL</label>
          <input
            id="repoUrl"
            v-model="formData.repoUrl"
            type="url"
            placeholder="https://github.com/username/repository"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="vercelUrl">Vercel 在线体验地址</label>
          <input
            id="vercelUrl"
            v-model="formData.vercelUrl"
            type="url"
            placeholder="https://your-project.vercel.app"
            required
          />
        </div>
        
        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? '提交中...' : '提交作品' }}
        </button>
      </form>
      
      <div class="navigation">
        <button @click="goBack" class="back-btn">← 返回</button>
      </div>
      
      <!-- 成功提示 -->
      <div v-if="showSuccess" class="success-message">
        <div class="success-icon">✓</div>
        <h3>提交成功！</h3>
        <p>感谢您的参与，我们会尽快审查您的作品。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const showSuccess = ref(false)

const formData = reactive({
  repoUrl: '',
  vercelUrl: ''
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 这里应该调用后端 API 保存提交信息
    console.log('提交的作品:', formData)
    
    // 显示成功消息
    showSuccess.value = true
    
    // 3秒后重置表单
    setTimeout(() => {
      formData.repoUrl = ''
      formData.vercelUrl = ''
      showSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/accept')
}
</script>

<style scoped>
.submit-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  position: relative;
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

.submit-form {
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
  border-color: #11998e;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
  box-shadow: 0 5px 15px rgba(17, 153, 142, 0.4);
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

.success-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  animation: fadeIn 0.5s ease-in-out;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-bottom: 20px;
  animation: bounce 0.6s ease-in-out;
}

.success-message h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.success-message p {
  color: #7f8c8d;
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .submit-content {
    padding: 30px 20px;
    margin: 0 10px;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
}
</style>

