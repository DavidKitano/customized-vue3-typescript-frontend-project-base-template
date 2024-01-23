<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg?image" width="125" height="125" />
    <Suspense>
      <div class="wrapper">
        <hello-world :msg="`当前版本:${version}`" />

        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </div>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </header>

  <router-view />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/common/hello-world.vue'

type Version = {
  version: number
}

const version = ref<Date>()

const fetchVersionFile = () => {
  fetch('/version.json')
    .then((res) => res.json())
    .then((data: Version) => (version.value = new Date(data.version))) // 假设 'version.json' 在服务器的根目录
}
fetchVersionFile()
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
