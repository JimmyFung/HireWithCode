<template>
  <div class="guide-container">
    <div class="guide-content">
      <div class="markdown-content" v-html="markdownContent"></div>
      <div class="navigation">
        <button @click="goToAcceptChallenge" class="next-btn">
          开始挑战 →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const markdownContent = ref('')

const markdownText = `# HireWithCode - 面试者挑战项目

欢迎来到 \`HireWithCode\` 项目！这是一个专为技术面试者设计的真实项目挑战。目前，这个仓库刚刚起步，没有任何代码——只有待实现的功能（TODOs）。你的任务是将这些TODOs转变为实际的代码，提交你的Pull Request（PR）就是你面试的一部分挑战。

## 产品功能 TODOs
产品是一个 Web 网站（PC端、移动端兼容），分为 4 个步骤的页面：
- **欢迎语**：Logo + 一句话欢迎语（垂直水平居中，2 秒后自动进入下一页 *面试引导*）
- **面试引导**：介绍面试的流程和说明（Markdown 文案展示，需要渲染为富文本样式）
- **接受挑战**：表单，\`input\`(用户输入自己的 github id) 、\`input\`(邮箱)、\`submit button\`(接受挑战)
- **完成挑战**：表单，\`input\`(github 仓库 url)、\`input\`(Vercel 在线体验地址)、\`submit button\`(提交作品)

## 如何参与？

1. 克隆仓库到你的本地机器。
2. 按照你对这个产品的理解，自行开发 TODO
3. 确保你的代码是可以运行的
4. 完成挑战后，通过Pull Request将你的代码提交给我们。
5. 在PR中附上你的Vercel在线体验链接。

> **备注说明：**
> 这个项目的步骤 3、4 是是需要服务端能力的（API + 数据库），如果你不具备全栈的经验，可以考虑使用 [supabase](https://supabase.com/) 作为本项目的服务端（或者仅仅实现前端静态网页）

我们会审查每一个PR，并以此作为面试的一部分。我们期待看到你的创意和技术实力！

**祝你好运！**`

// 简单的 Markdown 转 HTML 函数
function parseMarkdown(text: string): string {
  return text
    // 标题
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 粗体
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // 代码块
    .replace(/`([^`]*)`/gim, '<code>$1</code>')
    // 链接
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank">$1</a>')
    // 列表项
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // 引用块
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // 段落
    .replace(/\n\n/gim, '</p><p>')
    // 换行
    .replace(/\n/gim, '<br>')
}

onMounted(() => {
  markdownContent.value = '<p>' + parseMarkdown(markdownText) + '</p>'
})

const goToAcceptChallenge = () => {
  router.push('/accept')
}
</script>

<style scoped>
.guide-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 40px 20px;
}

.guide-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.markdown-content {
  padding: 40px;
  line-height: 1.6;
  color: #333;
}

.markdown-content :deep(h1) {
  color: #2c3e50;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.markdown-content :deep(h2) {
  color: #34495e;
  margin-top: 30px;
  margin-bottom: 20px;
}

.markdown-content :deep(h3) {
  color: #7f8c8d;
  margin-top: 25px;
  margin-bottom: 15px;
}

.markdown-content :deep(code) {
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #e74c3c;
}

.markdown-content :deep(a) {
  color: #3498db;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(li) {
  margin-bottom: 8px;
  list-style-type: disc;
  margin-left: 20px;
}

.markdown-content :deep(blockquote) {
  background: #f8f9fa;
  border-left: 4px solid #3498db;
  padding: 15px 20px;
  margin: 20px 0;
  font-style: italic;
}

.markdown-content :deep(strong) {
  color: #2c3e50;
  font-weight: 600;
}

.navigation {
  padding: 30px 40px;
  background: #f8f9fa;
  text-align: center;
}

.next-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .guide-content {
    margin: 0 10px;
  }
  
  .markdown-content,
  .navigation {
    padding: 20px;
  }
  
  .markdown-content :deep(h1) {
    font-size: 1.5rem;
  }
}
</style>

