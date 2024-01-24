<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{
  msg: {
    versionText: string
    version: Date
    welcomeText: string
  }
}>()

const now = ref(dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss'))
let timer: any = null

const updateNow = () => {
  timer = requestAnimationFrame(() => {
    now.value = dayjs(`${new Date()}`).format('YYYY-MM-DD HH:mm:ss')
    updateNow()
  })
}
onMounted(() => {
  updateNow()
})
onUnmounted(() => {
  if (timer) cancelAnimationFrame(timer)
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg.welcomeText }}</h1>
    <h3>
      <p>{{ msg.versionText }}</p>
      <p class="version-text">当前版本 {{ dayjs(msg.version).format('YYYY-MM-DD HH:mm:ss') }}</p>
      <p class="version-text">现在时间 {{ now }}</p>
      <br />
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
    </h3>
  </div>
</template>

<style scoped>
.version-text {
  font-size: 1rem;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
