import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import stores from '@/stores'
import router from './router'

// markdown 相关
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
// highlightjs
import hljs from 'highlight.js'

VMdPreview.use(githubTheme, {
  Hljs: hljs
}).use(createCopyCodePlugin())


function bootstrap() {
  const app = createApp(App)
  
  app.use(stores)
  app.use(router)
  app.use(VMdPreview)
  app.mount('#app')
}

bootstrap()
