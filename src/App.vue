<template>
  <header>
    <el-watermark :font="font" content="Template made by David">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg?image" width="125" height="125" />
      <div class="wrapper">
        <hello-world :msg="msg" />
        <nav>
          <router-link to="/">首页</router-link>
          <router-link to="/about">查看集成内容</router-link>
        </nav>
      </div>
    </el-watermark>
  </header>
  <el-watermark :font="font" content="Template made by David">
    <router-view />
  </el-watermark>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/common/hello-world.vue'
import ev from '@/utils/eventLoopSample'
import { fetchVersionFile } from './utils/versionCheck'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)'
})

const msg = ref({
  version: new Date(''),
  versionText: '这是一个自定义的Vue 3搭配TypeScript、Vite等的模版',
  welcomeText: '你终于刷到我辣，现在你的身边多了一位健康的心理咨熊师'
})

ev()

onMounted(async () => {
  msg.value.version = await fetchVersionFile()
})
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);

    &:first-of-type {
      border: 0;
    }
  }
  a.router-link-exact-active {
    color: var(--color-text);
  }

  a.router-link-exact-active:hover {
    background-color: transparent;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
@/utils/eventLoopSample
